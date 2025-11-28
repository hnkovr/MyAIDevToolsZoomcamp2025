import airbyte as ab

source = ab.get_source(
    "source-faker",
    config={"count": 5_000},
    install_if_missing=True,
)
source.check()
source.select_all_streams()
result = source.read()

for name, records in result.streams.items():
    print(f"Stream {name}: {len(list(records))} records")
