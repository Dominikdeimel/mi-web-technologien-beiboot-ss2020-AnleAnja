# Workflow

- A `develop` branch is created from `master`
- `feature` branches are created from `develop`
- When a `feature` is completed it is merged into the `develop` branch
- When a milestone is completed, the current commit of the `develop` branch receives a Release-Candidate Tag and 
is used for testing
- In case issues emerge on a release candidate, they are documented as a bug and developed just like a feature with
high priority. Upon resolving of all issues the version is tagged as a new release candidate for another testing run.
- When testing is successful, the release candidate will be merged into the master (no fast-forward)
- Issues in `master` are documented and resolved in the next milestone, except for hotfixes which are
  - issues that prevent the application from being used
  - major issues that can be resolved without risking to break something else
- `hotfix` branches are created from `master`
- Once the `hotfix` is completed it is merged to both `develop` and `master`
