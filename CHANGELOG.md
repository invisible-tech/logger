*v2.0.0*
> Internal: Remove unused Loggly and Bugsnag
> Internal: Remove unecessary patch

*v1.2.3*
> Feat: Open-source it under the MIT license.
> Internal: Refactor logger and transports to be loaded as needed.

*v1.2.2*
> Internal: Update CircleCI to version 2

*v1.2.1*
> Fix: Set up Timber transport to be used with Heroku drains. This sets up a normal console transport with the Timber formatter.

*v1.2.0*
> Feat: Add Loggly.com transport

*v1.1.6*
> Internal: add `nsp` and exceptions for `deep-extend` Prototype Pollution vulnerability (Low CVSS).

*v1.1.5*
> Fix: Move `patch-package` and `postinstall-prepare` for dependencies.

*v1.1.4*
> Fix: Inactive Timber.io transport

*v1.1.3*
> Internal: Update bugsnag version
> Internal: Move Timber transport to its own file
> Internal: Add tests for message object types
> Fix: Timber.io empty message error

*v1.1.2*
> Internal: update dependencies

*v1.1.1*
> Fix: Blank messages bug when logging an Error object using Timber.io

*v1.1.0*
> Feat: Add Timber.io transport

*v1.0.0*
> Internal: Add @invisible/changelog-update
> Internal: remove @google-cloud dependency (Breaking change)
