ELMS: Requirement Dashboard
Development Sponsored by The Pennsylvania State University
ELMS is Copyright (C) 2008-2012  The Pennsylvania State University

Bryan Ollendyke
bto108@psu.edu

Keith D. Bailey
kdb163@psu.edu

12 Borland
University Park,  PA 16802

***** USAGE *****
This is an API (as well as a collection of implementations of providers) for creating requirements dashboards in Drupal.  Drupal comes with hook_requirements that can be invoked in the .install file but this only allows for inclusion on the system status page.  By itself, this module does nothing and requires that sub-modules or contributed ones implement it.

Using this module you can effectively create your own status pages and then hook into them from other projects as you see fit.  This was written to allow group admins in ELMS to be able to see a form of "drupal status" page but specific to them.  The providers that ship relate to the different areas in ELMS and then requirements are harvested from the various projects in ELMS to generate the dashboard.

***** Notes *****
This module was inspired by Drupal's Core hook_requirements.