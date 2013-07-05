About Spaces Taxonomy
=====================

A vocabulary is selected that will represent the Space realm and any
node tagged with a term from that Vocabulary will belong to that term
space. A node can only belong to one term space and you can't move it
between term spaces.

It would obviously be a nice to have to support multiple spaces and
moving between spaces but the implementation of both of these is
tricky, in particular questions like:

 1. If you land in node/5 without a PURL modifier which of its multiple
    spaces should spaces push you to? Should it just show it to you out of
    any space context? (often a bad idea)

 2. If you want to move foo/node/5 to bar/node/5, how do you handle any
    associations that may/may not be relevant in the new space? For
    example, imagine moving a casetracker case from a client group to a
    private group -- what should happen to its parent project and any
    email subscriptions for users that aren't in the target space?

These are reasons that term spaces are single selects.
