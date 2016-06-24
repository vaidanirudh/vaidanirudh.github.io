 $(document).ready(function(){
                var ItWasCurrBtn = false;
                $('#fromCurr').click(function(){
                    ItWasCurrBtn = true;
                });

                $('.CurrBtn').click(function(){                    
                    var choosed = $(this).val();
                    if (ItWasCurrBtn == false)
                    {
                        $('#toCurr').val(choosed);
                        $('#toCurr').text(choosed);                        
                    }
                    else
                    {
                        $('#fromCurr').val(choosed);
                        $('#fromCurr').text(choosed);
                        ItWasCurrBtn = false;
                    }
                    
                    Refresh();
                });
                $('#FromCurr').keyup(function() {
                    Refresh();
                });
                Refresh();
            });
            function Refresh()
            {
                var OldCurrency = $('#fromCurr').val();
                var NewCurrency = $('#toCurr').val();
                var Amount = $('#FromCurr').val();
                if (OldCurrency == NewCurrency)
                {
                    $('#ToCurr').val(Amount);
                    return;
                }
                $.ajax
                ({
                    url: 'http://api.fixer.io/latest',
                    data: 'base=' + OldCurrency,
                    dataType: 'json',
                    cache: false,
                    timeout: 10000,
                    type: "GET",
                    success: function(data)
                    {
                        $('#error').attr('hidden', '');
                        var Result = data.rates[NewCurrency] * Amount;
                        $('#ToCurr').val(Result);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown)
                    {
                        $('#error').removeAttr('hidden');
                        $('#error').text("Oops! Something went wrong");
                    }
                });
            }
            setInterval(Refresh, 1000*5);
