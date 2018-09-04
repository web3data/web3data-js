# How to contribute

If you are looking to contribute, please take a look at the current open issues in Github: chances are these are the most urgent and pressing issues where your impact will be the most valuable! 

Of course feel free to make your own issues if you think something needs to added or fixed.

# Basic quality checks

Please ensure that all tests pass before submitting changes. Most projects have a full test suite that are automatically run as part of the default phase of the Maven lifecycle (`mvn package` or `mvn install`).

They can also be run individually: unit tests with `mvn test` and integration tests with `mvn verify`.

We follow the default Google code formatting style, please make sure to follow and adhere to these conventions when submitting code.

# Submitting Changes

Please sign the [Contributor License Agreement](https://docs.google.com/forms/d/e/1FAIpQLSc6O3CudbzEvSEos_VbXAf6bah05dvx_OZRXDHBx7gFLe-uJA/viewform).

This form is also available [here](https://s3.us-east-2.amazonaws.com/amberdata-public/docs/icla.pdf) in PDF format. 

Submit a pull request rebased on top of master
 * Include a descriptive commit message.
 * Changes contributed via pull request should focus on a single issue at a time.

Please allow a few business days for us to comment on your PR, depending on the number of open PRs.
