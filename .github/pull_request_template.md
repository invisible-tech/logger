# Feature or Bug Fix Description

- Include link to jira ticket
- What are you adding? Include screenshots or gifs if it involves frontend changes

# Security Implications

- Does this affect our security? If so, how?

# Before you request review:

- [ ] Perform a self review to catch stupid mistakes (like leaving in commented code)
- [ ] Code contains relevant tests, and all new and existing tests pass
- [ ] Linting and type checking passes (`yarn lint:fix && yarn check-types`)
- [ ] Commit messages follow [semantic commit message format](https://seesparkbox.com/foundry/semantic_commit_messages)

Note: The above (aside from self-review) are checked automatically via Github Actions, so they will prevent you from merging. Save you and your reviewer some time and fix them before requesting review.
