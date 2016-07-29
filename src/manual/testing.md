# Testing

## FAQ

#### Tests are hanging, or not continuing/stopping
You most likely have an exception or uncaught rejection in your code. Try running your test in isolation to first see if it passes. If it passes, then there is another test that is most likely broken. Please file an issue.

However, if your test fails, try adding debug statements using the `logger.debug` to help you debug your test and code.

If you are unable to resolve your test, make sure that your work is in a feature branch, and create a PR explaining that you need help fixing your test.
