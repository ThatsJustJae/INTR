KJE.Default.PAY_WEEKLY=0;KJE.Default.PAY_ACCEL_WEEK=1;KJE.Default.PAY_ACCEL_BI=2;KJE.Default.PAY_BIWEEKLY=3;KJE.Default.PAY_2XMONTHLY=4;KJE.Default.PAY_MONTHLY=5;KJE.Default.PAY_QUARTERLY=6;KJE.Default.PAY_SEMIANNUAL=7;KJE.Default.PAY_ANNUAL=8;KJE.Default.getPayDrop=function(c,b,g){KJE.Default.PAY_PERIOD_IDs=KJE.parameters.get("ARRAY_PAY_PERIODS_IDS",[KJE.Default.PAY_WEEKLY,KJE.Default.PAY_ACCEL_WEEK,KJE.Default.PAY_ACCEL_BI,KJE.Default.PAY_BIWEEKLY,KJE.Default.PAY_2XMONTHLY,KJE.Default.PAY_MONTHLY]);KJE.Default.PAY_PERIODS=KJE.parameters.get("ARRAY_PAY_PERIODS",["weekly","accelerated weekly","accelerated bi-weekly","bi-weekly","semi-monthly","monthly","quarterly","semi-annual","annual"]);KJE.Default.PAY_PERIODS_TITLE=KJE.parameters.get("ARRAY_PAY_PERIODS_TITLE",["Weekly","Accelerated weekly","Accelerated bi-weekly","Bi-weekly","Semi-monthly","Monthly","Quarterly","Semi-annual","Annual"]);KJE.Default.PAY_FREQUENCY=[52,12,12,26,24,12,4,2,1];KJE.Default.PAY_FREQUENCY_ACCELERATED=[52,52,26,26,24,12,4,2,1];KJE.Default.PAY_ACCELERATED=[false,true,true,false,false,false,false,false,false];var a=KJE.Default.PAY_PERIOD_IDs;var f=a.length;var e=KJE.Default.PAY_PERIODS;var d=new Array(f);for(i=0;i<f;i++){d[i]=e[a[i]]}return KJE.getDropBox(c,KJE.parameters.get(c,(!b?KJE.Default.PAY_LOAN_IDs:b)),a,d,g)};KJE.CompareLoanCalc=function(){this.SHOW_APR=true;this.bIO=KJE.parameters.get("INTEREST_ONLY",false);this.ADDITIONAL_OUTPUT=KJE.parameters.get("ADDITIONAL_OUTPUT","");this.TITLE_MESSAGE=KJE.parameters.get("TITLE_MESSAGE","MSG_LOANBEST_LOAN_BY_APR provides the lowest Annual Percentage Rate (APR) of BEST_LOAN_APR.");this.COMPARE_TYPE=KJE.parameters.get("COMPARE_TYPE","MORTGAGE");this.SHOW_PAYMENT_TYPES=false;if(this.COMPARE_TYPE=="CAMORTGAGE"||this.COMPARE_TYPE=="CALOAN"){this.SHOW_PAYMENT_TYPES=true}this.SHOW_PAYMENT_TYPES=KJE.parameters.get("SHOW_PAYMENT_TYPES",this.SHOW_PAYMENT_TYPES);this.MSG_ERROR1=KJE.parameters.get("MSG_ERROR1","At least one loan must have an amount.");this.MSG_ERROR2=KJE.parameters.get("MSG_ERROR2","Years to amortize cannot be less than the loan term.");var a=this.LOAN_COUNT=KJE.parameters.get("LOAN_COUNT",3);this.IO_TERM=KJE.FloatArray(a);this.LOAN_AMOUNT=KJE.FloatArray(a);this.INTEREST_RATE=KJE.FloatArray(a);this.NEW_INTEREST_RATE=KJE.FloatArray(a);this.LOAN_TERM=KJE.FloatArray(a);this.LOAN_TERM_ENTERED=KJE.FloatArray(a);this.PAYMENT_TYPE=KJE.IntArray(a);this.AMORTIZATION=KJE.FloatArray(a);this.AMORTIZATION_ENTERED=KJE.FloatArray(a);this.CLOSING_COSTS=KJE.FloatArray(a);this.MONTHLY_LOAN_PAYMENT=KJE.FloatArray(a);this.ANNUAL_PERCENTAGE_RATE=KJE.FloatArray(a);this.BALLOON_PAYMENT=KJE.FloatArray(a);this.PAYMENTS_PER_YEAR=KJE.IntArray(a);this.PAYMENT_TYPE_DESC=new Array(a);this.PAYMENT_TYPE_TITLE=new Array(a);this.LOAN_PAYMENT=KJE.FloatArray(a);this.TOTAL_PAYMENTS=KJE.FloatArray(a);this.TOTAL_INTEREST=KJE.FloatArray(a);this.LOAN_NAME=new Array(a);for(var b=0;b<a;b++){this.LOAN_NAME[b]=KJE.parameters.get("MSG_LOAN"+(b+1),"Loan "+(b+1))}this.MSG_NA=KJE.parameters.get("MSG_NA","n/a");this.ORIGINATION_FEE=KJE.FloatArray(a);this.COMMITMENT_FEE=KJE.FloatArray(a);this.OTHER_FEES=KJE.FloatArray(a);this.OTHER_COSTS=KJE.FloatArray(a);this.BEST_LOAN_BY_APR=0;this.BEST_LOAN_APR=0;this.BEST_LOAN_BY_PAYMENT=0;this.BEST_LOAN_PAYMENT=0;this.DS_PAYMENTS=null;this.DS_APR=null;this.cats=null};KJE.CompareLoanCalc.prototype.clear=function(){var a=this.LOAN_COUNT;for(var b=0;b<a;b++){this.LOAN_AMOUNT[b]=0;this.INTEREST_RATE[b]=0;this.AMORTIZATION[b]=0;this.ORIGINATION_FEE[b]=0;this.COMMITMENT_FEE[b]=0;this.OTHER_FEES[b]=0;this.OTHER_COSTS[b]=0;this.PAYMENT_TYPE[b]=KJE.Default.PAY_MONTHLY}};KJE.CompareLoanCalc.prototype.calculate=function(D){var m=KJE;var u=this.LOAN_COUNT;var y=this.LOAN_AMOUNT;var g=this.INTEREST_RATE;var d=this.AMORTIZATION;var A=this.NEW_INTEREST_RATE;var s=this.PAYMENT_TYPE;var q=this.CLOSING_COSTS;var t=this.MONTHLY_LOAN_PAYMENT;var x=this.LOAN_PAYMENT;var E=this.ANNUAL_PERCENTAGE_RATE;var j=this.BALLOON_PAYMENT;var h=this.PAYMENTS_PER_YEAR;var B=this.LOAN_TERM;var o=this.bIO;for(var z=0;z<u;z++){q[z]=0;t[z]=0;E[z]=0;j[z]=0;h[z]=12;this.PAYMENT_TYPE_DESC[z]=KJE.Default.PAY_PERIODS[s[z]];this.PAYMENT_TYPE_TITLE[z]=(KJE.lang=="FR"?this.PAYMENT_TYPE_DESC[z]:KJE.Default.PAY_PERIODS_TITLE[s[z]]);this.AMORTIZATION_ENTERED[z]=this.AMORTIZATION[z];this.LOAN_TERM_ENTERED[z]=this.LOAN_TERM[z]}if(y[0]+y[1]+y[2]<=0){throw (this.MSG_ERROR1)}var k=0;for(var z=0;z<u;z++){if(o){var r=d[z];B[z]=KJE.Default.IO_TERMS[r]+KJE.Default.IO_AMORTS[r];d[z]=B[r];this.IO_TERM[z]=KJE.Default.IO_TERMS[r]}h[z]=KJE.Default.PAY_FREQUENCY[s[z]];A[z]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(g[z]/200),(1/(h[z]/2)))-1)*(h[z]*100):g[z]);q[z]=this.ORIGINATION_FEE[z]+this.COMMITMENT_FEE[z]+this.OTHER_FEES[z]+this.OTHER_COSTS[z];if(KJE.Default.PAY_ACCELERATED[s[z]]){if(o){x[z]=m.round((A[z]/1200)*y[z],2)}else{x[z]=m.round(KJE.PMT(A[z]/1200,d[z]*12,y[z]),2)}h[z]=KJE.Default.PAY_FREQUENCY_ACCELERATED[s[z]];A[z]=(this.COMPARE_TYPE==("CAMORTGAGE")?(Math.pow(1+(g[z]/200),(1/(h[z]/2)))-1)*(h[z]*100):g[z]);x[z]=m.round(((x[z]*13)/h[z]),2);t[z]=(x[z]*h[z])/12;d[z]=KJE.PERIODS(A[z]/(h[z]*100),x[z],y[z])/h[z];if(B[z]>d[z]){B[z]=d[z]}}else{if(o){x[z]=m.round((A[z]/(h[z]*100))*y[z],2)}else{x[z]=m.round(KJE.PMT(A[z]/(h[z]*100),d[z]*h[z],y[z]),2)}if(h[z]==12){t[z]=x[z]}else{t[z]=(x[z]*h[z])/12}}if(this.COMPARE_TYPE==("CAMORTGAGE")){if(q[z]==0){E[z]=KJE.FV_AMT(g[z]/200,2,1)-1}else{var v=0;var l=0;var a=y[z];var c=0;for(var w=0;w<h[z]*B[z];w++){l+=a;var e=a*(A[z]/(h[z]*100));a=a+e-x[z];c++;v+=e;if(a<=0){break}}if(l>0&&c>0){l=l/c;var f=m.round(c/h[z],2);E[z]=(((q[z]+v)/(l*f)));E[z]=KJE.FV_AMT(E[z]/h[z],h[z],1)-1}else{E[z]=0}}}else{E[z]=KJE.APR(d[z]*h[z],x[z],A[z]/(h[z]*100),y[z],q[z])*h[z]}j[z]=0;if(d[z]!=B[z]){j[z]=y[z];if(d[z]>B[z]){for(var b=0;b<B[z]*12;b++){j[z]=j[z]+(j[z]*A[z]/1200)-t[z]}j[z]+=t[z]}else{throw (this.MSG_ERROR2)}}if(y[z]<=0){q[z]=0;t[z]=0;E[z]=0;j[z]=0;this.TOTAL_PAYMENTS[z]=0;this.TOTAL_INTEREST[z]=0}else{k++;this.TOTAL_PAYMENTS[z]=x[z]*B[z]*h[z]+j[z];this.TOTAL_INTEREST[z]=this.TOTAL_PAYMENTS[z]-y[z];if(g[z]==0){this.TOTAL_INTEREST[z]=0;this.TOTAL_PAYMENTS[z]=y[z]}}}this.DS_PAYMENTS=KJE.FloatArray(k);this.DS_APR=KJE.FloatArray(k);this.cats=new Array(k);this.BEST_LOAN_BY_APR=10000000;this.BEST_LOAN_APR=10000000;this.BEST_LOAN_BY_PAYMENT=10000000;this.BEST_LOAN_PAYMENT=10000000;var C=0;for(var z=0;z<this.LOAN_COUNT;z++){if(y[z]>0){this.DS_PAYMENTS[C]=t[z];this.DS_APR[C]=E[z];this.cats[C++]=this.LOAN_NAME[z];if(this.BEST_LOAN_APR>E[z]){this.BEST_LOAN_BY_APR=z+1;this.BEST_LOAN_APR=E[z]}if(this.BEST_LOAN_PAYMENT>t[z]){this.BEST_LOAN_BY_PAYMENT=z+1;this.BEST_LOAN_PAYMENT=t[z]}}}this.MONTHLY_LOAN_PAYMENT=t;this.ANNUAL_PERCENTAGE_RATE=E};KJE.CompareLoanCalc.prototype.formatReport=function(c){var d=KJE;var a=this.iDecimal;var e=c;e=KJE.showCode("<SHOW_APR>","<END_SHOW_APR>",this.SHOW_APR,e);e=KJE.replace("ADDITIONAL_OUTPUT",this.ADDITIONAL_OUTPUT,e);for(var f=1;f<=this.LOAN_COUNT;f++){var b=f-1;e=KJE.replace("LOAN_AMOUNT"+f,d.dollars(this.LOAN_AMOUNT[b]),e);e=KJE.replace("INTEREST_RATE"+f,d.percent(this.INTEREST_RATE[b]/100,3),e);e=KJE.replace("LOAN_TERM_ENTERED"+f,d.number(this.LOAN_TERM_ENTERED[b])+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("LOAN_TERM"+f,d.number(this.LOAN_TERM[b],(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[b]]?1:0))+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("AMORTIZATION_ENTERED"+f,d.number(this.AMORTIZATION_ENTERED[b])+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("ACCEL_AMORTIZATION"+f,(KJE.Default.PAY_ACCELERATED[this.PAYMENT_TYPE[b]]?"<br>"+d.number(this.AMORTIZATION[b],1)+" "+KJE.MSG_YEARS_LBL+" "+this.PAYMENT_TYPE_DESC[b]:""),e);e=KJE.replace("AMORTIZATION"+f,d.number(this.AMORTIZATION[b],1)+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("ORIGINATION_FEE"+f,d.dollars(this.ORIGINATION_FEE[b]),e);e=KJE.replace("COMMITMENT_FEE"+f,d.dollars(this.COMMITMENT_FEE[b]),e);e=KJE.replace("OTHER_FEES"+f,d.dollars(this.OTHER_FEES[b]),e);e=KJE.replace("OTHER_COSTS"+f,d.dollars(this.OTHER_COSTS[b]),e);e=KJE.replace("CLOSING_COSTS"+f,d.dollars(this.CLOSING_COSTS[b]),e);e=KJE.replace("MONTHLY_LOAN_PAYMENT"+f,d.dollars(this.MONTHLY_LOAN_PAYMENT[b],2),e);e=KJE.replace("LOAN_PAYMENT"+f,d.dollars(this.LOAN_PAYMENT[b],2)+" "+this.PAYMENT_TYPE_DESC[b],e);e=KJE.replace("ANNUAL_PERCENTAGE_RATE"+f,d.percent(this.ANNUAL_PERCENTAGE_RATE[b],3),e);e=KJE.replace("BALLOON_PAYMENT"+f,d.dollars(this.BALLOON_PAYMENT[b],2),e);e=KJE.replace("TOTAL_INTEREST"+f,d.dollars(this.TOTAL_INTEREST[b],0),e);e=KJE.replace("TOTAL_PAYMENTS"+f,d.dollars(this.TOTAL_PAYMENTS[b],0),e);e=KJE.replace("TOTAL_INTEREST_FEES"+f,d.dollars(this.TOTAL_INTEREST[b]+this.CLOSING_COSTS[b],0),e);e=KJE.replace("TOTAL_PAYMENTS_FEES"+f,d.dollars(this.TOTAL_PAYMENTS[b]+this.CLOSING_COSTS[b],0),e);e=KJE.replace("IO_TERM"+f,d.number(this.IO_TERM[b],0)+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("IO_REMAINING_TERM"+f,d.number(25-this.IO_TERM[b],0)+" "+KJE.MSG_YEARS_LBL,e);e=KJE.replace("MSG_LOAN"+f,this.LOAN_NAME[b],e)}e=KJE.replace("TITLE_MESSAGE",this.TITLE_MESSAGE,e);e=KJE.replace("BEST_LOAN_PAYMENT",d.dollars(this.BEST_LOAN_PAYMENT,2),e);e=KJE.replace("BEST_LOAN_APR",d.percent(this.BEST_LOAN_APR,3),e);e=KJE.replace("BEST_LOAN_BY_APR",d.number(this.BEST_LOAN_BY_APR),e);e=KJE.replace("BEST_LOAN_BY_PAYMENT",d.number(this.BEST_LOAN_BY_PAYMENT),e);for(var f=1;f<=this.LOAN_COUNT;f++){var b=f-1;e=KJE.replace("MSG_LOAN"+f,this.LOAN_NAME[b],e)}return e};KJE.showCode=function(e,h,d,b){var g=b;if(!d){var c=g.indexOf(e);var a=g.indexOf(h);var f="";while(c>0&&a>c){f+=g.substring(0,c);f+=g.substring(a+h.length);c=g.indexOf(e);a=g.indexOf(h)}g=(f==""?b:f)}g=KJE.replace(e,"",g);g=KJE.replace(h,"",g);return g};KJE.CalcName="Compare payments for 15,20 and 30 year mortgages.";KJE.CalcType="CompareLoan3";KJE.CalculatorTitle="Compare Monthly Payments";KJE.parameters.getSet("LOAN_COUNT",3);KJE.LabelLength=120;KJE.InputLength=70;KJE.RightPad=5;KJE.LabelLeftMargin=0;KJE.InputTotalLength=KJE.LabelLeftMargin+KJE.LabelLength+KJE.InputLength+KJE.RightPad;KJE.SliderMinLength=130;KJE.parseInputs=function(a){KJE.Default.getPayDrop("PAYMENT_TYPE",KJE.Default.PAY_MONTHLY);return a};KJE.initialize=function(){KJE.CalcControl=new KJE.CompareLoanCalc();KJE.GuiControl=new KJE.CompareLoan(KJE.CalcControl)};KJE.CompareLoan=function(f){var e=KJE;var c=KJE.gLegend;var b=KJE.inputs.items;var a=f.COMPARE_TYPE=="CAMORTGAGE";this.MSG_PAYMENT=KJE.parameters.get("MSG_PAYMENT",a?"Loan amount":"Loan Payment");var d=f.LOAN_COUNT;KJE.InputItem.AltHelpName="LOAN_AMOUNT";KJE.Nbr("LOAN_AMOUNT","Mortgage amount",KJE.Default.MortgageMin,KJE.Default.MortgageMax,0,KJE.FMT_DOLLARS);KJE.InputItem.AltHelpName="INTEREST_RATE";KJE.Nbr("INTEREST_RATE1",KJE.parameters.get("MSG_INTEREST_RATE","Interest rate"),KJE.Default.MortgageRateMin,KJE.Default.MortgageRateMax,3,KJE.FMT_PERCENT,"test",null);KJE.Nbr("INTEREST_RATE2",KJE.parameters.get("MSG_INTEREST_RATE","Interest rate"),KJE.Default.MortgageRateMin,KJE.Default.MortgageRateMax,3,KJE.FMT_PERCENT,"test",null);KJE.Nbr("INTEREST_RATE3",KJE.parameters.get("MSG_INTEREST_RATE","Interest rate"),KJE.Default.MortgageRateMin,KJE.Default.MortgageRateMax,3,KJE.FMT_PERCENT,"test",null);KJE.addDiv("INPUTS",KJE.colorList[0])};KJE.CompareLoan.prototype.setValues=function(d){var a=KJE.inputs.items;var b=a.LOAN_AMOUNT.getValue();for(var e=1;e<=d.LOAN_COUNT;e++){var c=e-1;d.LOAN_AMOUNT[c]=b;d.INTEREST_RATE[c]=a["INTEREST_RATE"+e].getValue();d.LOAN_TERM[c]=d.AMORTIZATION[c]=KJE.parameters.get("LOAN_TERM"+e);d.PAYMENT_TYPE[e]=KJE.Default.PAY_MONTHLY}};KJE.CompareLoan.prototype.refresh=function(d){var c=KJE;var a=KJE.inputs.items;for(var e=1;e<=d.LOAN_COUNT;e++){var b=e-1;if(a["INTEREST_RATE"+e]){KJE.setLabelText(a["INTEREST_RATE"+e]._Additional,(c.dollars(d.MONTHLY_LOAN_PAYMENT[b],2)))}}};KJE.InputScreenText=" <div id=KJE-D-INPUTS> <div id='KJE-C-LOAN_AMOUNT'><input id='KJE-LOAN_AMOUNT' /></div> <div style=\"height:10px\"></div> <div id='KJE-C-TITLE'><table width=\"100%\" role='presentation'><tr><td width=\"130\">&nbsp;</td><td width=\"80\" align=\"left\">Rate</td><td width=\"100%\" align=\"left\">Payment</td></tr></table></div> <div id='KJE-C-INTEREST_RATE1'><input id='KJE-INTEREST_RATE1' /></div> <div id='KJE-C-INTEREST_RATE2'><input id='KJE-INTEREST_RATE2' /></div> <div id='KJE-C-INTEREST_RATE3'><input id='KJE-INTEREST_RATE3' /></div> <div style=\"height:10px\"></div> </div> ";KJE.DefinitionText=" <div id='KJE-D-LOAN_AMOUNT' ><dt>Loan amount</dt><dd>The total dollar amount for this loan.</dd></div> <div id='KJE-D-INTEREST_RATE' ><dt>Interest rate</dt><dd>The interest rate on this loan.</dd></div> <div id='KJE-D-LOAN_TERM' ><dt>Loan term</dt><dd>The number of years over which you will repay this loan. The most common terms are 15 years and 30 years. If this loan has a 'balloon' payment, the loan term will be shorter than the number of years to amortize the loan. For example, a loan with a 5-year term amortized over 30 years will have the same monthly payment as a 30-year loan with the same interest rate. The difference is the 30-year loan will have equal payments for 30 years. The 5-year loan will have equal payments for 5 years and then a very large, or balloon, payment for the remaining balance.</dd></div> ";KJE.ReportText=' <!--HEADING "Loan Comparison Calculator" HEADING--> <h2 class=\'KJEReportHeader KJEFontHeading\'>TITLE_MESSAGE</h2> <div class=KJEReportTableDiv><table class=KJEReportTable> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder KJECell40">&nbsp; </th><td class="KJECellStrong KJECellBorder KJECell20"> MSG_LOAN1 </td><td class="KJECellStrong KJECellBorder KJECell20">MSG_LOAN2 </td><td class="KJECellStrong KJECell20"> MSG_LOAN3 </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder">Loan amount </th><td class="KJECell KJECellBorder"> LOAN_AMOUNT1 </td><td class="KJECell KJECellBorder"> LOAN_AMOUNT2 </td><td class="KJECell"> LOAN_AMOUNT3 </td></tr> <tr class=KJEEvenRow><th class="KJELabel KJECellBorder">Interest rate </th><td class="KJECell KJECellBorder"> INTEREST_RATE1 </td><td class="KJECell KJECellBorder"> INTEREST_RATE2 </td><td class="KJECell"> INTEREST_RATE3 </td></tr> <tr class=KJEOddRow><th class="KJELabel KJECellBorder">Loan term </th><td class="KJECell KJECellBorder"> LOAN_TERM1 </td><td class="KJECell KJECellBorder"> LOAN_TERM2 </td><td class="KJECell"> LOAN_TERM3 </td></tr> <tr class=KJEFooterRow><th class="KJELabel KJECellBorder">Monthly loan payment </th><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT1 </td><td class="KJELabel KJECellBorder"> MONTHLY_LOAN_PAYMENT2 </td><td class="KJELabel"> MONTHLY_LOAN_PAYMENT3 </td></tr> </table> </div> <BR> ';