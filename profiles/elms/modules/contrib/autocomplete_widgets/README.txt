;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Autocomplete Widgets for CCK Text and Number fields
;;
;; Module Author: markus_petrux (http://drupal.org/user/39593)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

OVERVIEW
========

This module adds 4 autocomplete widgets for Drupal 7

- Autocomplete for allowed values list: This widget can be used for List fields
  and it takes candidate values from the defined list of Allowed values of the
  fields.

- Autocomplete for existing field data: This widget can be used for Text only
  and it takes candidate values from existing values in the database for that
  field.

- Autocomplete for suggested values: This widget can be used for Text only
  and it takes candidate values from a user-defined list of Suggested values.

- Autocomplete for existing field data and some node titles: This widget works
  just like the "existing field data" widget above except it will also suggest
  node titles for nodes of a specific content type(s).

All these widgets allow you to choose the size of the text element and the
method used to match values between 'Starts with' and 'Contains'.

When the Internationalization module [1] is enabled, the 'Autocomplete for
existing field data' widget also provides an option to filter values by the
language assigned to their corresponding nodes. This option allows you to
provide a different set of allowed values per language.

[1] http://drupal.org/project/i18n


INSTALLATION
============

- Copy all contents of this package to your modules directory preserving
  subdirectory structure.

- Go to Administer > Site building > Modules to install this module.

- Create or edit content types and start using the widgets for your Text and/or
  List fields. :)
