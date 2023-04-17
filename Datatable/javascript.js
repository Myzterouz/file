$(document).ready(function() {
        var table = $('#myTable').DataTable({
            "ajax": "test.json",
            "columns": [
                {"data": "name"},
                {"data": "age"},
                {"data": "gender"},
                {"data": "country"}
            ],
            "order": [[0, "asc"]],
            "initComplete": function(settings, json) {
                var uniqueAges = table.column(1).data().unique().sort().toArray();
                var select = '<select class="form-control"><option value="">All Ages</option>';
                for (var i = 0; i < uniqueAges.length; i++) {
                    select += '<option value="' + uniqueAges[i] + '">' + uniqueAges[i] + '</option>';
                }
                select += '</select>';
                $('#myTable thead tr:eq(1) th:eq(1)').html(select);
                $('#myTable thead tr:eq(1) th:eq(1) select').on('change', function() {
                    var value = $(this).val();
                    table.column(1).search(value).draw();
                });
            },
            // "responsive": true,
            "orderCellsTop": true,
            "paging": false,
            "searching": true,
            "info": false,
            // "width": "100%",
            "autoWidth ": false,
    });

    setInterval( function () {
        table.ajax.reload();
        console.log("reload");
    }, 1000 ); // Reload table every 1 seconds
});
