import com.owtelse.sbt.S3WebsitePlugin.S3WS._

enablePlugins(S3WebsitePlugin)
/**
 * You should give the project a real name
 * by default a prefix is prepended to the name such that
 *
 * name := "foobar"
 *
 * would produce an a path(key) in S3 of "techsync/<year>/<month>/foobar"
 *   where <year> is the current year and <month> is the current month.
 *
 * you can modify the prefix by using PrefixKeys.tsyncprefix setting,
 * eg to create an s3 path of "techsync/wibble/foobar" you would do this:-
 *
 *
 *
 * PrefixKeys.tsyncprefix := "wibble"
 *
 * name := "foobar"
 *
 *
 *
 * NB you can always check what you prefix is by doing:
 *
 * sbt s3wsPrefix
 *
 */
name := "$name$"

/* The following settings are all set by default - uncomment to change them */

//s3wsBucket := "docs.aws.avocadoconsulting.com.au"

//s3wsAssetDir := baseDirectory.value / "assets"

//progressBar in s3wsUpload := true

//s3wsIncremental := true

//credentials += Credentials(Path.userHome / ".s3AvocadoCreds")

/* as mentioned above the s3wsPrefix, ie the "folder" in your S3 bucket is calculated using the following settings
 * feel free to modify the stem settings or simply redefine s3wsPrefix
 */
//PrefixKeys.tsyncprefixRoot := "<either techsync or techsync/lightning depending on choice when running g8>"

// PrefixKeys.tsyncprefix1 := "<year eg 2015>"

// PrefixKeys.tsyncprefix2 := "<month eg 07>"

// PrefixKeys.tsyncprefix := PrefixKeys.tsyncprefix1.value + "/" + PrefixKeys.tsyncprefix2.value

// s3wsPrefix := PrefixKeys.thePrefixRootalue + "/" + PrefixKeys.tsyncprefixalue + "/" + name.value + "/"

