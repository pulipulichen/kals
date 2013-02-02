<style type="text/css">
table.annotation_table {
    margin-bottom: 10px;
    width: 100%;
}
table.annotation_table.respond {
    width: 90%;
}

table.row, table.anchor_row  {
    width: 100%;
}
table.anchor_row {
    background-color: #0b559b;
    color: #FFF;
}

table.row td {
    text-align: center;
}

table.row th.email {
    /*text-align:left;*/
}
table.row td.annotation_id {
    text-align:right;
}
table.anchor_row th {
    width: 100px;
}

table.row .recommend {
    text-align: left;
}
table.row .recommend .state {
    font-weight: bold;
    color:peru;
}

table.row .recommend .accept {
    color: green;
}
table.row .recommend .reject {
    color: red;
}

table.row .type {
    color: white;
    font-weight: bold;
}
table.row .type.example {
    background-color: green;
}
table.row .type.summary {
    background-color: #670808;
}
table.row .type.custom {
    background-color: white;
    color: black;
}
table.row .type.question {
    background-color: red;
}
table.row .type.confusion {
    background-color: #800080;
}
table.row .type.importance {
    background-color: yellow;
    color: black;
}


table.annotation_table .note {
    width: 100%;
}
</style>
<?= $text ?>