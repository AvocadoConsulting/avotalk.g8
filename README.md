#Avocado techtalk giter8 template

Template to get tech talks running quickly.

after installing g8 you should be able to type:-

```
g8 karlroberts/techtalk.g8
```

The script will checkout the template, ask a few boilerplate questions and
prepare your talk skeleton.


### push to s3 bucket
Once uploaded to the bucket it will be visible online at
```
http://docs.aws.avocadoconsulting.com.au/techtalks/<year>/<month>/<name>/index.html
```

to upload it type:-
```
sbt s3wsSync
```

this will cause the copy up in S3 to mirror what you have locally. You can test where the talk will be published with:

```
$ # show bucket name
$ sbt s3wsBucket
[info] docs.aws.avocadoconsulting.com.au

$ # show the prefix
$ s3wsPrefix
techtalks/2015/08/mytalk/
```

the above talk would be at `http://docs.aws.avocadoconsulting.com.au/techtalks/2015/08/mytalk/`





### save your talk to a git repo

Add your talk to the (techtalks git repo TBD)[https://???]
and follow the prompts to add it to gitlab.




Installation of giter8 (g8)
------------

You can install giter8 and other Scala command line tools with
[Conscript][cs]. This will setup Conscript in `~/bin/cs`:

    curl https://raw.githubusercontent.com/n8han/conscript/master/setup.sh | sh

(See [Conscript's readme][cs] for a non-unixy option.) Once `cs` is
on your path, you can install (or upgrade) giter8 with this command:

    cs n8han/giter8

    [cs]: https://github.com/n8han/conscript#readme

To make sure everything is working, try running `g8` with no
parameters. This should download giter8 and its dependencies, then print
a usage message.

When it's time to upgrade to a new version of giter8, just run the
same `cs` command again.

Giter8 is also installable with the OS X package manager [Homebrew][]:

    $ brew update && brew install giter8

[Homebrew]: http://mxcl.github.com/homebrew/
