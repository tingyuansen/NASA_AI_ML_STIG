from __future__ import annotations

from contextlib import contextmanager
from pathlib import Path

import numpy as np
import pandas as pd

from isochrones import get_ichrone
from isochrones.populations import StarPopulation
from isochrones.priors import ChabrierPrior


def find_repo_root() -> Path:
    root = Path.cwd().resolve()
    while not (root / "environment-isochrones.yml").exists() and root != root.parent:
        root = root.parent
    return root


ROOT = find_repo_root()
OUTPUT_DIR = ROOT / "tutorial_data"

COMMON_CONFIG = {
    "bands": ["G", "BP", "RP"],
    "vvcrit": 0.4,
    "imf_bounds": (0.70, 2.20),
    "binary_fraction": 0.0,
    "distance_pc": 10.0,
    "AV": 0.0,
    "output_dir": OUTPUT_DIR,
}

SINGLE_CONFIG = {
    **COMMON_CONFIG,
    "filename": "tutorial_single_population.npz",
    "columns": ["G", "BR", "RP"],
    "logage": 9.40,
    "feh": -0.25,
    "n_stars": 300_000,
    "sample_seed": 7,
}

CONDITIONAL_CONFIG = {
    **COMMON_CONFIG,
    "filename": "tutorial_conditional_population.npz",
    "columns": ["G", "BP", "RP", "population_index", "log_tau", "feh"],
    "catalog_seed": 11,
    "sample_seed_start": 10_000,
    "logage_range": (9.0, 9.8),
    "feh_range": (-0.50, 0.25),
    "n_populations": 1_000,
    "n_stars_per_population": 100,
}


class FixedValuePrior:
    def __init__(self, value: float):
        self.value = float(value)

    def sample(self, n_samples: int) -> np.ndarray:
        return np.full(int(n_samples), self.value, dtype=float)


class FixedSFH:
    def __init__(self, logage: float):
        self.logage = float(logage)

    def sample_ages(self, n_samples: int) -> np.ndarray:
        return np.full(int(n_samples), self.logage, dtype=float)


@contextmanager
def temporary_numpy_seed(seed: int):
    state = np.random.get_state()
    np.random.seed(int(seed))
    try:
        yield
    finally:
        np.random.set_state(state)


def load_mist():
    return get_ichrone(
        "mist",
        bands=COMMON_CONFIG["bands"],
        vvcrit=COMMON_CONFIG["vvcrit"],
    )


def simulate_clean_population(
    mist,
    *,
    logage: float,
    feh: float,
    n_target: int,
    sample_seed: int,
    imf_bounds=(0.70, 2.20),
    binary_fraction=0.0,
    distance_pc=10.0,
    AV=0.0,
) -> pd.DataFrame:
    population = StarPopulation(
        mist,
        imf=ChabrierPrior(bounds=imf_bounds),
        fB=binary_fraction,
        sfh=FixedSFH(logage),
        feh=FixedValuePrior(feh),
        distance=distance_pc,
        AV=AV,
    )
    with temporary_numpy_seed(sample_seed):
        raw = population.generate(n_target, exact_N=True)

    g_mag = raw["G_mag"].to_numpy(np.float32)
    bp_mag = raw["BP_mag"].to_numpy(np.float32)
    rp_mag = raw["RP_mag"].to_numpy(np.float32)

    return pd.DataFrame(
        {
            "G": g_mag,
            "BP": bp_mag,
            "RP": rp_mag,
            "BR": (bp_mag - rp_mag).astype(np.float32),
            "log_tau": np.full(len(raw), np.float32(logage), dtype=np.float32),
            "feh": np.full(len(raw), np.float32(feh), dtype=np.float32),
        }
    )


def build_conditioning_catalog(
    *,
    seed: int,
    n_populations: int,
    logage_range: tuple[float, float],
    feh_range: tuple[float, float],
    sample_seed_start: int,
) -> pd.DataFrame:
    rng = np.random.default_rng(seed)
    width = max(3, len(str(int(n_populations) - 1)))
    return pd.DataFrame(
        {
            "population_id": [f"pop_{i:0{width}d}" for i in range(int(n_populations))],
            "population_seed": int(sample_seed_start) + np.arange(int(n_populations), dtype=np.int64),
            "log_tau": rng.uniform(*logage_range, size=n_populations).astype(float),
            "feh": rng.uniform(*feh_range, size=n_populations).astype(float),
        }
    )


def save_single_population_npz(dataset: pd.DataFrame, config: dict) -> Path:
    outdir = Path(config["output_dir"])
    outdir.mkdir(exist_ok=True, parents=True)

    npz_path = outdir / config["filename"]
    np.savez_compressed(
        npz_path,
        data=dataset[config["columns"]].to_numpy(np.float32),
        columns=np.asarray(config["columns"]),
        log_tau=np.array(config["logage"], dtype=np.float32),
        feh=np.array(config["feh"], dtype=np.float32),
        sample_seed=np.array(config["sample_seed"], dtype=np.int64),
    )
    return npz_path


def save_conditional_population_npz(
    dataset: pd.DataFrame,
    population_index: pd.DataFrame,
    config: dict,
) -> Path:
    outdir = Path(config["output_dir"])
    outdir.mkdir(exist_ok=True, parents=True)

    population_id_map = {
        name: i for i, name in enumerate(sorted(dataset["population_id"].unique()))
    }

    dataset = dataset.copy()
    dataset["population_index"] = dataset["population_id"].map(population_id_map).astype(np.float32)

    population_table = (
        population_index.copy()
        .assign(
            population_index=lambda frame: frame["population_id"].map(population_id_map).astype(np.float32)
        )
        .sort_values("population_index")
        .reset_index(drop=True)
    )

    npz_path = outdir / config["filename"]
    np.savez_compressed(
        npz_path,
        data=dataset[config["columns"]].to_numpy(np.float32),
        columns=np.asarray(config["columns"]),
        population_table=population_table[["population_index", "log_tau", "feh"]].to_numpy(np.float32),
        population_table_columns=np.asarray(["population_index", "log_tau", "feh"]),
        population_seed_catalog=population_table["population_seed"].to_numpy(np.int64),
        catalog_seed=np.array(config["catalog_seed"], dtype=np.int64),
        sample_seed_start=np.array(config["sample_seed_start"], dtype=np.int64),
        log_tau_range=np.asarray(config["logage_range"], dtype=np.float32),
        feh_range=np.asarray(config["feh_range"], dtype=np.float32),
    )
    return npz_path


def main() -> None:
    mist = load_mist()

    single_dataset = simulate_clean_population(
        mist,
        logage=SINGLE_CONFIG["logage"],
        feh=SINGLE_CONFIG["feh"],
        n_target=SINGLE_CONFIG["n_stars"],
        sample_seed=SINGLE_CONFIG["sample_seed"],
        imf_bounds=SINGLE_CONFIG["imf_bounds"],
        binary_fraction=SINGLE_CONFIG["binary_fraction"],
        distance_pc=SINGLE_CONFIG["distance_pc"],
        AV=SINGLE_CONFIG["AV"],
    ).sample(frac=1.0, random_state=SINGLE_CONFIG["sample_seed"]).reset_index(drop=True)

    single_npz_path = save_single_population_npz(single_dataset, SINGLE_CONFIG)
    print(f"saved: {single_npz_path.relative_to(ROOT)}")
    print("shape:", single_dataset[SINGLE_CONFIG["columns"]].shape)
    print("columns:", SINGLE_CONFIG["columns"])

    population_index = build_conditioning_catalog(
        seed=CONDITIONAL_CONFIG["catalog_seed"],
        n_populations=CONDITIONAL_CONFIG["n_populations"],
        logage_range=CONDITIONAL_CONFIG["logage_range"],
        feh_range=CONDITIONAL_CONFIG["feh_range"],
        sample_seed_start=CONDITIONAL_CONFIG["sample_seed_start"],
    )

    populations = []
    for row in population_index.itertuples(index=False):
        population = simulate_clean_population(
            mist,
            logage=row.log_tau,
            feh=row.feh,
            n_target=CONDITIONAL_CONFIG["n_stars_per_population"],
            sample_seed=int(row.population_seed),
            imf_bounds=CONDITIONAL_CONFIG["imf_bounds"],
            binary_fraction=CONDITIONAL_CONFIG["binary_fraction"],
            distance_pc=CONDITIONAL_CONFIG["distance_pc"],
            AV=CONDITIONAL_CONFIG["AV"],
        )
        population["population_id"] = row.population_id
        population["population_seed"] = int(row.population_seed)
        populations.append(population)

    conditional_dataset = pd.concat(populations, ignore_index=True)
    conditional_dataset = conditional_dataset.sample(
        frac=1.0,
        random_state=CONDITIONAL_CONFIG["catalog_seed"],
    ).reset_index(drop=True)

    conditional_npz_path = save_conditional_population_npz(
        conditional_dataset,
        population_index,
        CONDITIONAL_CONFIG,
    )
    print(f"saved: {conditional_npz_path.relative_to(ROOT)}")
    print("shape:", conditional_dataset.shape[0], "rows")
    print("columns:", CONDITIONAL_CONFIG["columns"])

    single_npz = np.load(single_npz_path)
    conditional_npz = np.load(conditional_npz_path)

    print("single keys:", single_npz.files)
    print("single columns:", single_npz["columns"].tolist())
    print("single data shape:", single_npz["data"].shape, single_npz["data"].dtype)
    print("conditional keys:", conditional_npz.files)
    print("conditional columns:", conditional_npz["columns"].tolist())
    print("conditional data shape:", conditional_npz["data"].shape, conditional_npz["data"].dtype)
    print("population table shape:", conditional_npz["population_table"].shape)


if __name__ == "__main__":
    main()
