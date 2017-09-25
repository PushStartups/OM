<?php

$creditCardNo = '4003447840172805';
$cvv = '788';
$expDate = '0321';
$amount = 100;
$email = 'muhammad.iftikhar.aftab@gmail.com';
$str = "Error";
$cgConf['tid']='8804324';
$cgConf['amount']=$amount;
$cgConf['user']='pushstart';
$cgConf['password']='OE2@38sz';
$cgConf['cg_gateway_url']="https://cguat2.creditguard.co.il/xpo/Relay";

$user_order['email'] = 'muhammad.iftikhar.aftab@gmail.com';
$user_id = '111';

$poststring = 'user='.$cgConf['user'];
$poststring .= '&password='.$cgConf['password'];
$user_order['restaurantTitle'] = 'Angus';

/*Build Ashrait XML to post*/
$poststring.='&int_in=<ashrait>
							<request>
							<language>ENG</language>
							<command>doDeal</command>
							<requestId/>
							<version>1000</version>
							<doDeal>
								<terminalNumber>'.$cgConf['tid'].'</terminalNumber>
								<authNumber/>
								<transactionCode>Phone</transactionCode>
								<transactionType>Debit</transactionType>
								<total>'.$amount.'</total>
								<creditType>RegularCredit</creditType>
								<cardNo>'.$creditCardNo.'</cardNo>
								<cvv>'.$cvv.'</cvv>
								<cardExpiration>'.$expDate.'</cardExpiration>
								<validation>AutoComm</validation>
								<numberOfPayments/>
								<customerData>
									<userData1>'.$user_order['email'].'</userData1>
									<userData2/>
									<userData3/>
									<userData4/>
									<userData5/>
								</customerData>
								<currency>ILS</currency>
								<firstPayment/>
								<periodicalPayment/>
								<user>Push</user>	
								
								<invoice>

									<invoiceCreationMethod>wait</invoiceCreationMethod>
									
									<invoiceDate/>
									
									<invoiceSubject>'.$user_order['restaurantTitle'].' Order# '.$user_id.'</invoiceSubject>
									
									<invoiceDiscount/>

                                    <invoiceDiscountRate/>
									
									<invoiceItemCode>'.$user_id.'</invoiceItemCode>
									
									<invoiceItemDescription>'.$user_order['restaurantTitle'].' food order from OrderApp</invoiceItemDescription>
									
									<invoiceItemQuantity>1</invoiceItemQuantity>
									
									<invoiceItemPrice>'.$amount.'</invoiceItemPrice>
									
									<invoiceTaxRate/>
									
									<invoiceComments/>
									
									<companyInfo>OrderApp</companyInfo>
									
									<sendMail>1</sendMail>
									
									<mailTo>muhammad.iftikhar.aftab@gmail.com</mailTo>
									
									<isItemPriceWithTax>1</isItemPriceWithTax>
									
									<ccDate>'.date("Y-m-d").'</ccDate>
									
									<invoiceSignature/>
									
									<invoiceType/>
									
									<DocNotMaam/>
									
								</invoice>	
								
							</doDeal>
						</request>
					</ashrait>';

//init curl connection
if( function_exists( "curl_init" )) {
    $CR = curl_init();
    curl_setopt($CR, CURLOPT_URL, $cgConf['cg_gateway_url']);
    curl_setopt($CR, CURLOPT_POST, 1);
    curl_setopt($CR, CURLOPT_FAILONERROR, true);
    curl_setopt($CR, CURLOPT_POSTFIELDS, $poststring);
    curl_setopt($CR, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($CR, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($CR, CURLOPT_FAILONERROR, true);


    //actual curl execution perfom
    $result = curl_exec($CR);
    $error = curl_error($CR);

    // on error - die with error message
    if (!empty($error)) {

        die($error);

    }

    curl_close($CR);


    print_r($result);
}
?>