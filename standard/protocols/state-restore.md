# State Restore and Freshness

1. Resolve the trusted control source and freeze the exact relevant revision for the run.
2. Restore the latest durable checkpoint/result when one exists.
3. Re-read governing state that may have changed since that checkpoint.
4. Confirm the target work item, source/candidate revision, dependencies, and ownership are still current.
5. If material state moved, replan or stop rather than acting on a stale snapshot.
6. Do not use conversational memory as the only source of operational truth.
