ELMS Distribution
Copyright (C) 2011-2012  The Pennsylvania State University

Bryan Ollendyke
bto108@psu.edu

Keith D. Bailey
kdb163@psu.edu

12 Borland
University Park,  PA 16802

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License,  or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not,  write to the Free Software Foundation,  Inc.,
51 Franklin Street,  Fifth Floor,  Boston,  MA 02110-1301 USA.

The features of this system are still being ironed out as discussions progress.

Everything in this package is licensed as GPL with the following exceptions:
-- The HTML Purifier library is LGPL
-- The Simile timeline library is BSD

If you are interested in joining efforts in development please email elms@psu.edu.

------------
UPGRADE PATH
------------
If you were running Alpha code there is no upgrade path from Alpha to Beta.  Clear out Alpha files and install this release as a fresh install.  Upgrades will be supported between versions of Beta / Release Candidate.

------------
INSTALLATION
------------
-- Download the ELMS distribution from http://drupal.psu.edu/fserver
-- Unzip and go to the install.php page from a web-browser as you normally would when installing Drupal
-- Select the ELMS radio bubble and run through the typical Drupal installation
-- Select the core focus, features and optional packages that you'd like to install with ELMS. ELMS: ICMS is the primary focus at this time though the CLE should also install and give you an example of another flavor of ELMS.
-- You are now running the ELMS platform, enjoy making {what ever your core calls sites}!

------------
TROUBLESHOOTING INSTALLATION / SETUP
------------
PHP > 5.2
-- Unsupported because of date module though you can activate the date 5.2 emulation module and it should work.  This has been installed many times on 5.3 and has been tested a few times on PHP 5.2.

PHP 5.2
-- Zend Optimizer is recommended for installation because of the HTML Purifier library which likes having that active.
-- Defaults are often set to 32M in php.ini. The ELMS installer will attempt to increase this to 96M in install.php and index.php.
-- PHP 5.3 is recommended as it was the primary version things were developed for but this has been tested on 5.2 and while slower then 5.3, it does work.

Solving Drupal White screen of Death
-- Try setting the following settings in included .htaccess file:
-- php_value memory_limit 96M or set memory limit per the instructions in the "Installing on 1and1"

Installing on 1and1
-- Try making an access file that allows for clean URLS
-- add a php.ini file to the root of the installation with the following in it:
allow_url_fopen = TRUE
memory_limit = 96M
post_max_size = 10M
upload_max_filesize = 10M

Annoying MYSQL max packet error
-- The install process will attempt to fix this value for you, if you experience issues that have this message, try the following help documentation.
-- run the following command in mysql console: "SET GLOBAL max_allowed_packet=10*1024*1024;"
-- This error is caused mostly in localhost installs or shared environments and is caused by all the caching going on.
-- Review this page to help resolve it http://drupal.org/node/321210

------------
Known issues
------------
-- There are still some admin UIs that need to be built out and more visual user management.  Feeds can be constructed to import users without much of an issue but that is still down the road in our development.
-- The Reactions and Schedule Features have not been fully built out.  The Course Content and other feature that can be selected on install are mostly feature complete though will go through some UX work in the future.
-- Occationally UUIDs and group access duplicate entry errors can arrise, these are few and far between and can largely be ignored as the data is attempting to be double-added by a project.
-- The user menu (top right corner) has items out of order. To fix this, after install go to admin/build/features and find the components that say they are overridden.  Click the button, then check the box that needs to be reverted for each.  This should be working as part of the default installation but isn't yet :)