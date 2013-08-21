  -----------------------------------------------------------------------------
                         ABOUT JQGRID
  -----------------------------------------------------------------------------

This module provides views integration for the jqGRid jQuery plugin, which 
provides advanced interaction controls to HTML tables such as dynamic
pagination, on-the-fly filtering, and column sorting.

For full documentation and examples, visit the jqGRid jQuery plugin page:

http://www.trirand.com/blog/

  -----------------------------------------------------------------------------
                         CURRENT FEATURES
  -----------------------------------------------------------------------------

  * Cross browser. Supports for IE 6.0+, FireFox 2.0+, Safari 3.0+, Opera 9.2+ 
    and Google Chrome.
  
  * Basic Grid
  
    - Paging / Ajax support.
      Just enable Ajax in your View Settingd / Advanced / Use Ajax
    
    - Resizable Columns.
    
    - Sorting
    
    - Auto loading data when scrolling. 
      This feature allows you to load data without paging 
      and using only the vertical scrollbar.
      
    - Footer with calculated sum

  * Cell Editing 
    
    -  supporting of text, date picker, select

  * Searching and Filtering
    
    -  single field searching in toolbar
       You can specify which columns can be searchable.
  
  * Export : through the views_data_export module
  
  -----------------------------------------------------------------------------
                         REQUIREMENTS
  -----------------------------------------------------------------------------
  
The following modules are required:

  * views (7.3)
  * libraries
  * jquery_update (tested with jquery 1.5.2)
  
  -----------------------------------------------------------------------------
                         INSTALLATION
  -----------------------------------------------------------------------------

  1. Download the jqgrid plugin from http://www.trirand.com/blog/?page_id=6
     This module is tested with the master branch (2011-12-20) (jqGrid 4.3.1)

  2. Unzip & copy the directory into your sites/all/libraries directory
  
  3. Rename it to "jqgrid".
  
  4. Enable the module & you should have a new view style "jqgrid".


  -----------------------------------------------------------------------------
                         USAGE
  -----------------------------------------------------------------------------

  1. Create a new view at admin/build/views/add
  
  2. Add fields to show in the table.
  
  3. Select jqGRid as the view style and configure your grid

  -----------------------------------------------------------------------------
                         RECOMMENDED MODULES
  -----------------------------------------------------------------------------

  * Views data export module (http://drupal.org/project/views_data_export)
    Install this module if you want to export data from the grid. 
    Attach an export view & the export button will appear.
