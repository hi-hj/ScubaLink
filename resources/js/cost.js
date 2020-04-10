function prevStep1 () {
    history.back();
}

function prevStep2 () {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');

    document.getElementById('step_paging').getElementsByTagName('li')[1].classList.remove('active');
    document.getElementById('step_paging').getElementsByTagName('li')[0].classList.add('active');

    document.getElementsByTagName('html')[0].scrollTop = 0;
}

function prevStep3 () {
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step2').classList.add('active');

    document.getElementById('step_paging').getElementsByTagName('li')[2].classList.remove('active');
    document.getElementById('step_paging').getElementsByTagName('li')[1].classList.add('active');

    document.getElementsByTagName('html')[0].scrollTop = 0;
}

function prevStep4 () {
    document.getElementById('step4').classList.remove('active');
    document.getElementById('step3').classList.add('active');

    document.getElementById('step_paging').getElementsByTagName('li')[3].classList.remove('active');
    document.getElementById('step_paging').getElementsByTagName('li')[2].classList.add('active');

    document.getElementsByTagName('html')[0].scrollTop = 0;
}

function prevStep5 () {
    document.getElementById('step5').classList.remove('active');
    document.getElementById('step4').classList.add('active');

    document.getElementById('step_paging').getElementsByTagName('li')[4].classList.remove('active');
    document.getElementById('step_paging').getElementsByTagName('li')[3].classList.add('active');

    document.getElementsByTagName('html')[0].scrollTop = 0;
}

function nextStep1 () {
    var isValid = true;

    // 환율 선택유무 체크
    if (!document.getElementById('step1_won_checkbox').checked &&
        !document.getElementById('step1_dollor_checkbox').checked &&
        !document.getElementById('step1_yen_checkbox').checked &&
        !document.getElementById('step1_peso_checkbox').checked &&
        !document.getElementById('step1_euro_checkbox').checked) {
        isValid = false;
        document.getElementById('exchange_rate_empty_error').style.display = 'block';
    } else {
        document.getElementById('exchange_rate_empty_error').style.display = 'none';
    }

    // 환율 금액 입력 체크
    if (document.getElementById('step1_won_checkbox').checked &&
        document.getElementById('step1_won_input').value === '' &&
        document.getElementById('step1_currency').value !== '원') {
        isValid = false;
        document.getElementById('step1_won_input_error').style.display = 'block';
    }
    if (document.getElementById('step1_dollor_checkbox').checked &&
        document.getElementById('step1_dollor_input').value === '' &&
        document.getElementById('step1_currency').value !== '달러') {
        isValid = false;
        document.getElementById('step1_dollor_input_error').style.display = 'block';
    }
    if (document.getElementById('step1_yen_checkbox').checked &&
        document.getElementById('step1_yen_input').value === '' &&
        document.getElementById('step1_currency').value !== '엔') {
        isValid = false;
        document.getElementById('step1_yen_input_error').style.display = 'block';
    }
    if (document.getElementById('step1_peso_checkbox').checked &&
        document.getElementById('step1_peso_input').value === '' &&
        document.getElementById('step1_currency').value !== '페소') {
        isValid = false;
        document.getElementById('step1_peso_input_error').style.display = 'block';
    }
    if (document.getElementById('step1_euro_checkbox').checked &&
        document.getElementById('step1_euro_input').value === '' &&
        document.getElementById('step1_currency').value !== '유로') {
        isValid = false;
        document.getElementById('step1_euro_input_error').style.display = 'block';
    }

    for (var i = 0; i < document.getElementsByClassName('step1_cost_input').length; i++) {
        if (document.getElementsByClassName('step1_cost_input')[i].value === '') {
            isValid = false;
            document.getElementsByClassName('step1_cost_input_error')[i].style.display = 'block';
        }
    }

    if (isValid) {
        // data setting
        data.exchangerate = [];
        if (document.getElementById('step1_won_checkbox').checked) {
            var rate = 1;
            if (document.getElementById('step1_currency').value === '달러') {
                rate = 0.001;
            } else if (document.getElementById('step1_currency').value === '엔') {
                rate = 0.001;
            } else if (document.getElementById('step1_currency').value === '페소') {
                rate = 0.001;
            } else if (document.getElementById('step1_currency').value === '유로') {
                rate = 0.001;
            }
            data.exchangerate.push({
                type: '원',
                name: '원',
                price: (document.getElementById('step1_currency').value === '원' ? 1 : Math.floor(document.getElementById('step1_won_input').value * 100) / 100),
                rate: rate
            });
        }
        if (document.getElementById('step1_dollor_checkbox').checked) {
            var rate = 1;
            if (document.getElementById('step1_currency').value === '원') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '엔') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '페소') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '유로') {
                rate = 1;
            }
            data.exchangerate.push({
                type: '달러',
                name: '달러',
                price: (document.getElementById('step1_currency').value === '달러' ? 1 : Math.floor(document.getElementById('step1_dollor_input').value * 100) / 100),
                rate: rate
            });
        }
        if (document.getElementById('step1_yen_checkbox').checked) {
            var rate = 1;
            if (document.getElementById('step1_currency').value === '원') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '달러') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '페소') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '유로') {
                rate = 0.01;
            }
            data.exchangerate.push({
                type: '엔',
                name: '엔',
                price: (document.getElementById('step1_currency').value === '엔' ? 1 : Math.floor(document.getElementById('step1_yen_input').value * 100) / 100),
                rate: rate
            });
        }
        if (document.getElementById('step1_peso_checkbox').checked) {
            var rate = 1;
            if (document.getElementById('step1_currency').value === '원') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '달러') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '엔') {
                rate = 0.01;
            } else if (document.getElementById('step1_currency').value === '유로') {
                rate = 0.01;
            }
            data.exchangerate.push({
                type: '페소',
                name: '페소',
                price: (document.getElementById('step1_currency').value === '페소' ? 1 : Math.floor(document.getElementById('step1_peso_input').value * 100) / 100),
                rate: rate
            });
        }
        if (document.getElementById('step1_euro_checkbox').checked) {
            var rate = 1;
            if (document.getElementById('step1_currency').value === '원') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '달러') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '엔') {
                rate = 1;
            } else if (document.getElementById('step1_currency').value === '페소') {
                rate = 1;
            }
            data.exchangerate.push({
                type: '유로',
                name: '유로',
                price: (document.getElementById('step1_currency').value === '유로' ? 1 : Math.floor(document.getElementById('step1_euro_input').value * 100) / 100),
                rate: rate
            });
        }

        data.currency = document.getElementById('step1_currency').value;

        for (var i = 0; i < data.cost.length; i++) {
            if (data.cost[i].priceType === '') {
                data.cost[i].priceType = document.getElementById('step1_currency').value;
            }
        }

        makeStep2();

        document.getElementById('step2_summery_ins_count').innerHTML = insCount;
        document.getElementById('step2_summery_bgn_count').innerHTML = bgnCount;
        document.getElementById('step3_summery_ins_count').innerHTML = insCount;
        document.getElementById('step3_summery_bgn_count').innerHTML = bgnCount;
        document.getElementById('step4_summery_ins_count').innerHTML = insCount;
        document.getElementById('step4_summery_bgn_count').innerHTML = bgnCount;
        document.getElementById('step5_summery_ins_count').innerHTML = insCount;
        document.getElementById('step5_summery_bgn_count').innerHTML = bgnCount;

        document.getElementById('step1').classList.remove('active');
        document.getElementById('step2').classList.add('active');

        document.getElementById('step_paging').getElementsByTagName('li')[0].classList.remove('active');
        document.getElementById('step_paging').getElementsByTagName('li')[1].classList.add('active');

        document.getElementsByTagName('html')[0].scrollTop = 0;
    }
}

function nextStep2 () {
    var isValid = true;

    for (var i = 0; i < data.cost.length; i++) {
        if (document.getElementsByClassName('step2_price_input')[i].value === '' ||
            document.getElementsByClassName('step2_count_input')[i].value === '') {
            document.getElementsByClassName('step2_input_error')[i].style.display = 'block';
            isValid = false;
        }
    }

    if (isValid) {
        makeStep3();

        document.getElementById('step2').classList.remove('active');
        document.getElementById('step3').classList.add('active');

        document.getElementById('step_paging').getElementsByTagName('li')[1].classList.remove('active');
        document.getElementById('step_paging').getElementsByTagName('li')[2].classList.add('active');

        document.getElementsByTagName('html')[0].scrollTop = 0;
    }
}

function nextStep3 () {
    var isValid = true;

    for (var i = 0; i < data.cost.length; i++) {
        if (document.getElementsByClassName('step3_cost_expense_input')[i].value === '') {
            document.getElementsByClassName('step3_cost_expense_error')[i].style.display = 'block';
            isValid = false;
        }
    }

    // 추가 지출 비용 금액과 횟수는 입력했으나 이름을 입력 안한경우, 이름은 입력해야한다.
    for (i = 0; i < data.additional.length; i++) {
        if (data.additional[i].price !== '' && data.additional[i].price !== 0 &&
            data.additional[i].count !== '' && data.additional[i].count !== 0 &&
            document.getElementsByClassName('step3_additional_expense_name')[i].value === '') {
            document.getElementsByClassName('step3_additional_expense_error')[i].style.display = 'block';
            isValid = false;
        }
    }

    if (isValid) {
        makeStep4();

        document.getElementById('step3').classList.remove('active');
        document.getElementById('step4').classList.add('active');

        document.getElementById('step_paging').getElementsByTagName('li')[2].classList.remove('active');
        document.getElementById('step_paging').getElementsByTagName('li')[3].classList.add('active');

        document.getElementsByTagName('html')[0].scrollTop = 0;
    }
}

function nextStep4 () {
    var isValid = true;

    if (document.getElementById('s4_control_revenue').value === '' ||
        document.getElementById('step4_slide_cost_name').value === '') {
        document.getElementById('step4_slide_cost_error').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        makeStep5();

        document.getElementById('step4').classList.remove('active');
        document.getElementById('step5').classList.add('active');

        document.getElementById('step_paging').getElementsByTagName('li')[3].classList.remove('active');
        document.getElementById('step_paging').getElementsByTagName('li')[4].classList.add('active');
    }
}

function nextStep5 () {
    data.incomePerPerson = Math.floor(parseFloat(document.getElementById('step5_summery_income_per_person_hidden').innerHTML) * 100) / 100;
    data.profitPerPerson = Math.floor(parseFloat(document.getElementById('step5_summery_profit_per_person_hidden').innerHTML) * 100) / 100;
    data.profit = Math.floor(parseFloat(document.getElementById('step5_summery_profit_hidden').innerHTML) * 100) / 100;

    httpSend.send("/tour/cost/update", {
        tourId: tourId,
        cost: data
    }, "POST", function(result) {
        history.back();
    }, function(errorCode, errorMessage) {
        console.log(errorMessage);
    });


}

/* Step 1 */
function detectInputStep1 () {
    // 기본 화폐를 변경하면 각 환율 별 단위를 변경한다.
    if (document.getElementById('step1_currency').value === '원') {
        document.getElementById('step1_won_base_currency').innerHTML = '원';
        document.getElementById('step1_won_exchangerate').innerHTML = '= 1원';
        document.getElementById('step1_dollor_base_currency').innerHTML = '원';
        document.getElementById('step1_dollor_exchangerate').innerHTML = '= 1달러';
        document.getElementById('step1_yen_base_currency').innerHTML = '원';
        document.getElementById('step1_yen_exchangerate').innerHTML = '= 100엔';
        document.getElementById('step1_peso_base_currency').innerHTML = '원';
        document.getElementById('step1_peso_exchangerate').innerHTML = '= 100페소';
        document.getElementById('step1_euro_base_currency').innerHTML = '원';
        document.getElementById('step1_euro_exchangerate').innerHTML = '= 1유로';

        document.getElementById('step1_won_exchangerate_info').innerHTML = '약 1원 = 1원 (2019/10/01 19:43 기준)';
        document.getElementById('step1_dollor_exchangerate_info').innerHTML = '약 ' + getExchangerate('KRW', 'USD', 1) + '원 = 1달러 ' + getDatetime('KRW');
        document.getElementById('step1_yen_exchangerate_info').innerHTML = '약 ' + getExchangerate('KRW', 'JPY', 100) + '원 = 100엔 ' + getDatetime('KRW');
        document.getElementById('step1_peso_exchangerate_info').innerHTML = '약 ' + getExchangerate('KRW', 'PHP', 100) + '원 = 100페소 ' + getDatetime('KRW');
        document.getElementById('step1_euro_exchangerate_info').innerHTML = '약 ' + getExchangerate('KRW', 'EUR', 1) + '원 = 1유로 ' + getDatetime('KRW');

        document.getElementById('step1_won_input').placeholder = '1';
        document.getElementById('step1_dollor_input').placeholder = getExchangerate('KRW', 'USD', 1);
        document.getElementById('step1_yen_input').placeholder = getExchangerate('KRW', 'JPY', 100);
        document.getElementById('step1_peso_input').placeholder = getExchangerate('KRW', 'PHP', 100);
        document.getElementById('step1_euro_input').placeholder = getExchangerate('KRW', 'EUR', 1);

        document.getElementById('step1_won_checkbox').checked = true;
    } else if (document.getElementById('step1_currency').value === '달러') {
        document.getElementById('step1_won_base_currency').innerHTML = '달러';
        document.getElementById('step1_won_exchangerate').innerHTML = '= 1000원';
        document.getElementById('step1_dollor_base_currency').innerHTML = '달러';
        document.getElementById('step1_dollor_exchangerate').innerHTML = '= 1달러';
        document.getElementById('step1_yen_base_currency').innerHTML = '달러';
        document.getElementById('step1_yen_exchangerate').innerHTML = '= 100엔';
        document.getElementById('step1_peso_base_currency').innerHTML = '달러';
        document.getElementById('step1_peso_exchangerate').innerHTML = '= 100페소';
        document.getElementById('step1_euro_base_currency').innerHTML = '달러';
        document.getElementById('step1_euro_exchangerate').innerHTML = '= 1유로';

        document.getElementById('step1_won_exchangerate_info').innerHTML = '약 ' + getExchangerate('USD', 'KRW', 1000) + '달러 = 1000원 ' + getDatetime('USD');
        document.getElementById('step1_dollor_exchangerate_info').innerHTML = '약 1달러 = 1달러 (2019/10/01 19:43 기준)';
        document.getElementById('step1_yen_exchangerate_info').innerHTML = '약 ' + getExchangerate('USD', 'JPY', 100) + '달러 = 100엔 ' + getDatetime('USD');
        document.getElementById('step1_peso_exchangerate_info').innerHTML = '약 ' + getExchangerate('USD', 'PHP', 100) + '달러 = 100페소 ' + getDatetime('USD');
        document.getElementById('step1_euro_exchangerate_info').innerHTML = '약 ' + getExchangerate('USD', 'EUR', 1) + '달러 = 1유로 ' + getDatetime('USD');

        document.getElementById('step1_won_input').placeholder = getExchangerate('USD', 'KRW', 1000);
        document.getElementById('step1_dollor_input').placeholder = '1';
        document.getElementById('step1_yen_input').placeholder = getExchangerate('USD', 'JPY', 100);
        document.getElementById('step1_peso_input').placeholder = getExchangerate('USD', 'PHP', 100);
        document.getElementById('step1_euro_input').placeholder = getExchangerate('USD', 'EUR', 1);

        document.getElementById('step1_dollor_checkbox').checked = true;
    } else if (document.getElementById('step1_currency').value === '엔') {
        document.getElementById('step1_won_base_currency').innerHTML = '엔';
        document.getElementById('step1_won_exchangerate').innerHTML = '= 1000원';
        document.getElementById('step1_dollor_base_currency').innerHTML = '엔';
        document.getElementById('step1_dollor_exchangerate').innerHTML = '= 1달러';
        document.getElementById('step1_yen_base_currency').innerHTML = '엔';
        document.getElementById('step1_yen_exchangerate').innerHTML = '= 1엔';
        document.getElementById('step1_peso_base_currency').innerHTML = '엔';
        document.getElementById('step1_peso_exchangerate').innerHTML = '= 100페소';
        document.getElementById('step1_euro_base_currency').innerHTML = '엔';
        document.getElementById('step1_euro_exchangerate').innerHTML = '= 1유로';

        document.getElementById('step1_won_exchangerate_info').innerHTML = '약 ' + getExchangerate('JPY', 'KRW', 1000) + '엔 = 1000원 ' + getDatetime('JPY');
        document.getElementById('step1_dollor_exchangerate_info').innerHTML = '약 ' + getExchangerate('JPY', 'USD', 1) + '엔 = 1달러 ' + getDatetime('JPY');
        document.getElementById('step1_yen_exchangerate_info').innerHTML = '약 1엔 = 1엔 (2019/10/01 19:43 기준)';
        document.getElementById('step1_peso_exchangerate_info').innerHTML = '약 ' + getExchangerate('JPY', 'PHP', 100) + '엔 = 100페소 ' + getDatetime('JPY');
        document.getElementById('step1_euro_exchangerate_info').innerHTML = '약 ' + getExchangerate('JPY', 'EUR', 1) + '엔 = 1유로 ' + getDatetime('JPY');

        document.getElementById('step1_won_input').placeholder = getExchangerate('JPY', 'KRW', 1000);
        document.getElementById('step1_dollor_input').placeholder = getExchangerate('JPY', 'USD', 1);
        document.getElementById('step1_yen_input').placeholder = '1';
        document.getElementById('step1_peso_input').placeholder = getExchangerate('JPY', 'PHP', 100);
        document.getElementById('step1_euro_input').placeholder = getExchangerate('JPY', 'EUR', 1);

        document.getElementById('step1_yen_checkbox').checked = true;
    } else if (document.getElementById('step1_currency').value === '페소') {
        document.getElementById('step1_won_base_currency').innerHTML = '페소';
        document.getElementById('step1_won_exchangerate').innerHTML = '= 1000원';
        document.getElementById('step1_dollor_base_currency').innerHTML = '페소';
        document.getElementById('step1_dollor_exchangerate').innerHTML = '= 1달러';
        document.getElementById('step1_yen_base_currency').innerHTML = '페소';
        document.getElementById('step1_yen_exchangerate').innerHTML = '= 100엔';
        document.getElementById('step1_peso_base_currency').innerHTML = '페소';
        document.getElementById('step1_peso_exchangerate').innerHTML = '= 1페소';
        document.getElementById('step1_euro_base_currency').innerHTML = '페소';
        document.getElementById('step1_euro_exchangerate').innerHTML = '= 1유로';

        document.getElementById('step1_won_exchangerate_info').innerHTML = '약 ' + getExchangerate('PHP', 'KRW', 1000) + '페소 = 1000원 ' + getDatetime('PHP');
        document.getElementById('step1_dollor_exchangerate_info').innerHTML = '약 ' + getExchangerate('PHP', 'USD', 1) + '페소 = 1달러 ' + getDatetime('PHP');
        document.getElementById('step1_yen_exchangerate_info').innerHTML = '약 ' + getExchangerate('PHP', 'JPY', 100) + '페소 = 100엔 ' + getDatetime('PHP');
        document.getElementById('step1_peso_exchangerate_info').innerHTML = '약 1페소 = 1페소 (2019/10/01 19:43 기준)';
        document.getElementById('step1_euro_exchangerate_info').innerHTML = '약 ' + getExchangerate('PHP', 'EUR', 1) + '페소 = 1유로 ' + getDatetime('PHP');

        document.getElementById('step1_won_input').placeholder = getExchangerate('PHP', 'KRW', 1000);
        document.getElementById('step1_dollor_input').placeholder = getExchangerate('PHP', 'USD', 1);
        document.getElementById('step1_yen_input').placeholder = getExchangerate('PHP', 'JPY', 100);
        document.getElementById('step1_peso_input').placeholder = '1';
        document.getElementById('step1_euro_input').placeholder = getExchangerate('PHP', 'EUR', 1);

        document.getElementById('step1_peso_checkbox').checked = true;
    } else if (document.getElementById('step1_currency').value === '유로') {
        document.getElementById('step1_won_base_currency').innerHTML = '유로';
        document.getElementById('step1_won_exchangerate').innerHTML = '= 1000원';
        document.getElementById('step1_dollor_base_currency').innerHTML = '유로';
        document.getElementById('step1_dollor_exchangerate').innerHTML = '= 1달러';
        document.getElementById('step1_yen_base_currency').innerHTML = '유로';
        document.getElementById('step1_yen_exchangerate').innerHTML = '= 100엔';
        document.getElementById('step1_peso_base_currency').innerHTML = '유로';
        document.getElementById('step1_peso_exchangerate').innerHTML = '= 100페소';
        document.getElementById('step1_euro_base_currency').innerHTML = '유로';
        document.getElementById('step1_euro_exchangerate').innerHTML = '= 1유로';

        document.getElementById('step1_won_exchangerate_info').innerHTML = '약 ' + getExchangerate('EUR', 'KRW', 1000) + '유로 = 1000원 ' + getDatetime('EUR');
        document.getElementById('step1_dollor_exchangerate_info').innerHTML = '약 ' + getExchangerate('EUR', 'USD', 1) + '유로 = 1달러 ' + getDatetime('EUR');
        document.getElementById('step1_yen_exchangerate_info').innerHTML = '약 ' + getExchangerate('EUR', 'JPY', 100) + '유로 = 100엔 ' + getDatetime('EUR');
        document.getElementById('step1_peso_exchangerate_info').innerHTML = '약 ' + getExchangerate('EUR', 'PHP', 100) + '유로 = 100페소 ' + getDatetime('EUR');
        document.getElementById('step1_euro_exchangerate_info').innerHTML = '약 1유로 = 1유로 (2019/10/01 19:43 기준)';

        document.getElementById('step1_won_input').placeholder = getExchangerate('EUR', 'KRW', 1000);
        document.getElementById('step1_dollor_input').placeholder = getExchangerate('EUR', 'USD', 1);
        document.getElementById('step1_yen_input').placeholder = getExchangerate('EUR', 'JPY', 100);
        document.getElementById('step1_peso_input').placeholder = getExchangerate('EUR', 'PHP', 100);
        document.getElementById('step1_euro_input').placeholder = '1';

        document.getElementById('step1_euro_checkbox').checked = true;
    }

    // 환율 체크가 되어있으면 환율 입력란 활성화, 단 기본화폐라면 비활성화
    if (document.getElementById('step1_won_checkbox').checked) {
        if (document.getElementById('step1_currency').value !== '원') {
            document.getElementById('step1_won_input_wrap').classList.remove('hide');
        } else {
            document.getElementById('step1_won_input_wrap').classList.add('hide');
        }
    } else {
        document.getElementById('step1_won_input_wrap').classList.add('hide');
    }
    if (document.getElementById('step1_dollor_checkbox').checked) {
        if (document.getElementById('step1_currency').value !== '달러') {
            document.getElementById('step1_dollor_input_wrap').classList.remove('hide');
        } else {
            document.getElementById('step1_dollor_input_wrap').classList.add('hide');
        }
    } else {
        document.getElementById('step1_dollor_input_wrap').classList.add('hide');
    }
    if (document.getElementById('step1_yen_checkbox').checked) {
        if (document.getElementById('step1_currency').value !== '엔') {
            document.getElementById('step1_yen_input_wrap').classList.remove('hide');
        } else {
            document.getElementById('step1_yen_input_wrap').classList.add('hide');
        }
    } else {
        document.getElementById('step1_yen_input_wrap').classList.add('hide');
    }
    if (document.getElementById('step1_peso_checkbox').checked) {
        if (document.getElementById('step1_currency').value !== '페소') {
            document.getElementById('step1_peso_input_wrap').classList.remove('hide');
        } else {
            document.getElementById('step1_peso_input_wrap').classList.add('hide');
        }
    } else {
        document.getElementById('step1_peso_input_wrap').classList.add('hide');
    }
    if (document.getElementById('step1_euro_checkbox').checked) {
        if (document.getElementById('step1_currency').value !== '유로') {
            document.getElementById('step1_euro_input_wrap').classList.remove('hide');
        } else {
            document.getElementById('step1_euro_input_wrap').classList.add('hide');
        }
    } else {
        document.getElementById('step1_euro_input_wrap').classList.add('hide');
    }

    var isValid = true;
    if (!document.getElementById('step1_won_checkbox').checked &&
        !document.getElementById('step1_dollor_checkbox').checked &&
        !document.getElementById('step1_yen_checkbox').checked &&
        !document.getElementById('step1_peso_checkbox').checked &&
        !document.getElementById('step1_euro_checkbox').checked) {
        isValid = false;
    }
    if (document.getElementById('step1_won_checkbox').checked &&
        document.getElementById('step1_won_input').value === '' &&
        document.getElementById('step1_currency').value !== '원') {
        isValid = false;
    }
    if (document.getElementById('step1_dollor_checkbox').checked &&
        document.getElementById('step1_dollor_input').value === '' &&
        document.getElementById('step1_currency').value !== '달러') {
        isValid = false;
    }
    if (document.getElementById('step1_yen_checkbox').checked &&
        document.getElementById('step1_yen_input').value === '' &&
        document.getElementById('step1_currency').value !== '엔') {
        isValid = false;
    }
    if (document.getElementById('step1_peso_checkbox').checked &&
        document.getElementById('step1_peso_input').value === '' &&
        document.getElementById('step1_currency').value !== '페소') {
        isValid = false;
    }
    if (document.getElementById('step1_euro_checkbox').checked &&
        document.getElementById('step1_euro_input').value === '' &&
        document.getElementById('step1_currency').value !== '유로') {
        isValid = false;
    }

    for (var i = 0; i < document.getElementsByClassName('step1_cost_input').length; i++) {
        if (document.getElementsByClassName('step1_cost_input')[i].value === '') {
            isValid = false;
        }
    }

    if (isValid) {
        document.getElementById('step_1_next').style.backgroundColor = '#145db2';
    } else {
        document.getElementById('step_1_next').style.backgroundColor = '#cccccc';
    }
}

// 환율 선택 시 오류 메세지 제거
function changeExchangeRateType (item, id) {
    if (item.checked) {
        document.getElementById('exchange_rate_empty_error').style.display = 'none';
    }

    detectInputStep1();
}

// 환율 입력 시 오류 메세지 제거
function changeExchangeRate (item, id) {
    if (item === undefined) {
        document.getElementById('step1_won_checkbox').checked = false;
        document.getElementById('step1_dollor_checkbox').checked = false;
        document.getElementById('step1_yen_checkbox').checked = false;
        document.getElementById('step1_peso_checkbox').checked = false;
        document.getElementById('step1_euro_checkbox').checked = false;
        document.getElementById('step1_won_input').value = '';
        document.getElementById('step1_dollor_input').value = '';
        document.getElementById('step1_yen_input').value = '';
        document.getElementById('step1_peso_input').value = '';
        document.getElementById('step1_euro_input').value = '';
    } else {
        if (item.value !== '') {
            document.getElementById(id).style.display = 'none';
        }
    }

    detectInputStep1();
}

// 비용항목 변경
function changeCostItem () {
    for (var i = 0; i < document.getElementsByClassName('step1_cost_input').length; i++) {
        var item = document.getElementsByClassName('step1_cost_input')[i];

        if (item.value !== '') {
            document.getElementsByClassName('step1_cost_input_error')[i].style.display = 'none';
        }

        data.cost[i].name = item.value;
    }

    makeFocList();

    detectInputStep1();
}

var a = null;

// 비용항목 삭제
function deleteCostItem (item) {
    data.cost.splice($(item.parentNode.parentNode).index() + 1, 1);

    item.parentNode.parentNode.remove();

    makeFocList();

    detectInputStep1();
}

// 비용항목 추가
function addCostItem () {
    data.cost.push({
        name: '',
        foc: false,
        public: false,
        include: false,
        price: '',
        priceType: '',
        count: '',
        countType: '회',
        expense: ''
    });

    var divElement = document.createElement("div");
    var html = '';
    html += '<div class="input_cost">';
    html +=     '<input type="text" class="cost_name step1_cost_input" placeholder="예) 숙박비, 다이빙비" style="width: 80%;" value="" onkeyup="changeCostItem()" />';
    html +=     '<span class="remove_div btn" onclick="deleteCostItem(this)">';
    html +=         '<img src="/img/ic-close.svg">';
    html +=     '</span>';
    html += '</div>';
    html += '<div class="name_empty_error step1_cost_input_error" style="margin-top: -12px; margin-bottom: 12px;">항목 이름을 입력하세요.</div>';
    divElement.innerHTML = html;
    document.getElementsByClassName('step1_cost_item_wrap')[0].appendChild(divElement);

    makeFocList();

    detectInputStep1();
}

// FOC 할인항목 설정
function makeFocList () {
    var html = '';
    for (var i = 0; i < data.cost.length; i++) {
        html += '<li>';
        html +=     '<label class="cost_checkbox_container">';
        html +=         (data.cost[i].name === '' ? '예) 숙박비, 다이빙비' : data.cost[i].name);
        html +=         '<input type="checkbox" class="FOC_sale" onchange="changeCostFoc()" ' + (data.cost[i].foc ? 'checked' : '') + ' />';
        html +=         '<span class="cost_checkmark"></span>';
        html +=     '</label>';
        html += '</li>';
    }
    document.getElementById('step1_foc_list').innerHTML = html;
}

// FOC 할인항목 체크 변경
function changeCostFoc () {
    for (var i = 0; i < document.getElementById('step1_foc_list').getElementsByTagName('input').length; i++) {
        data.cost[i].foc = document.getElementById('step1_foc_list').getElementsByTagName('input')[i].checked;
        if (data.cost[i].include) {
            data.cost[i].include = false;
        }
    }
}


/* Step 2 */
// Step 2 비용 관련 입력창 수정
function changeStep2Cost () {
    var isValid = true;
    var incomePerPerson = 0;

    for (var i = 0; i < data.cost.length; i++) {
        if (document.getElementsByClassName('step2_price_input')[i].value !== '' &&
            document.getElementsByClassName('step2_count_input')[i].value !== '') {
            document.getElementsByClassName('step2_input_error')[i].style.display = 'none';
        } else {
            isValid = false;
        }

        var priceInput = document.getElementsByClassName('step2_price_input')[i].value === '' ? 0 : Math.floor(document.getElementsByClassName('step2_price_input')[i].value * 100) / 100;
        var priceType = document.getElementsByClassName('step2_price_type')[i].value;
        var countInput = document.getElementsByClassName('step2_count_input')[i].value === '' ? 0 : parseInt(document.getElementsByClassName('step2_count_input')[i].value);
        var countType = document.getElementsByClassName('step2_count_type')[i].value;

        var basicFormula = priceInput + priceType + ' x ' + countInput + countType;
        var basicCost = (priceInput * countInput);

        var advancedFormulaText = '';
        var advancedFormula = '';
        var advancedCost = 0;
        var advancedResult = '';

        var appliedCost = 0;

        data.cost[i].price = priceInput;
        data.cost[i].priceType = priceType;
        data.cost[i].count = countInput;
        data.cost[i].countType = countType;

        if (document.getElementsByClassName('step2_public_input')[i].checked &&
            document.getElementsByClassName('step2_include_input')[i].checked) {
            advancedFormulaText = '단가 x 횟수 / 교육생 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' / ' + bgnCount + '명';
            advancedCost = Math.floor(basicCost / bgnCount * 100) / 100;

            data.cost[i].public = true;
            data.cost[i].include = true;

            document.getElementsByClassName('step2_price_tag')[i].innerHTML = '공동비용, 강사비용포함 체크 시';
            document.getElementsByClassName('step2_price_tag')[i].classList.remove('hide');

            document.getElementsByClassName('step2_public_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_include_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_public_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step2_include_on_tag')[i].classList.remove('hide');
        } else if (document.getElementsByClassName('step2_public_input')[i].checked) {
            advancedFormulaText = '단가 x 횟수 / 참여자 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' / ' + (bgnCount + insCount) + '명';
            advancedCost = Math.floor(basicCost / (bgnCount + insCount) * 100) / 100;

            data.cost[i].public = true;
            data.cost[i].include = false;

            document.getElementsByClassName('step2_price_tag')[i].innerHTML = '공동비용지원 체크 시';
            document.getElementsByClassName('step2_price_tag')[i].classList.remove('hide');

            document.getElementsByClassName('step2_public_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_include_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_public_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step2_include_off_tag')[i].classList.remove('hide');
        } else if (document.getElementsByClassName('step2_include_input')[i].checked) {
            advancedFormulaText = '단가 x 횟수 + (단가 x 횟수) x 강사 수 / 교육생 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' + (' + priceInput + priceType + ' x ' + countInput + countType + ') x ' + insCount + '명' + ' / ' + bgnCount + '명';
            advancedCost = Math.floor((basicCost + basicCost * insCount / bgnCount) * 100) / 100;

            data.cost[i].public = false;
            data.cost[i].include = true;

            document.getElementsByClassName('step2_price_tag')[i].innerHTML = '강사비용포함 체크 시';
            document.getElementsByClassName('step2_price_tag')[i].classList.remove('hide');

            document.getElementsByClassName('step2_public_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_include_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_include_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step2_public_off_tag')[i].classList.remove('hide');
        } else {
            advancedFormulaText = '단가 x 횟수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType;
            advancedCost = Math.floor(basicCost * 100) / 100;

            data.cost[i].public = false;
            data.cost[i].include = false;

            document.getElementsByClassName('step2_price_tag')[i].innerHTML = '';
            document.getElementsByClassName('step2_price_tag')[i].classList.add('hide');

            document.getElementsByClassName('step2_public_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_include_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_public_off_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step2_include_off_tag')[i].classList.remove('hide');
        }

        advancedResult = advancedCost + priceType;
        if (data.cost[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.cost[i].priceType === data.exchangerate[j].type) {
                    appliedCost = Math.floor(advancedCost * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        } else {
            appliedCost = advancedCost;
        }
        incomePerPerson += appliedCost;

        document.getElementsByClassName('step2_formula_1')[i].innerHTML = '= ' + advancedFormulaText;
        document.getElementsByClassName('step2_formula_2')[i].innerHTML = '= ' + advancedFormula;
        document.getElementsByClassName('step2_formula_3')[i].innerHTML = '= ' + advancedResult;
        document.getElementsByClassName('step2_formula_result')[i].innerHTML = advancedResult;
        document.getElementsByClassName('step2_formula_5')[i].innerHTML = advancedResult + ' = ';
        document.getElementsByClassName('step2_formula_6')[i].innerHTML = appliedCost + data.currency;

        if (data.cost[i].priceType !== data.currency) {
            document.getElementsByClassName('step2_formula_5')[i].classList.remove('hide');
        } else {
            document.getElementsByClassName('step2_formula_5')[i].classList.add('hide');
        }

        if (data.cost[i].foc) {
            document.getElementsByClassName('step2_foc_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_foc_on_tag')[i].classList.remove('hide');
        } else {
            document.getElementsByClassName('step2_foc_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step2_foc_off_tag')[i].classList.remove('hide');
        }

        document.getElementsByClassName('step2_formula_4')[i].innerHTML = basicFormula;
    }

    incomePerPerson = Math.floor(incomePerPerson * 100) / 100;
    document.getElementById('step2_bgn_cost_per_person').innerHTML = parseInt(incomePerPerson) + data.currency;

    if (isValid) {
        document.getElementById('step_2_next').style.backgroundColor = '#145db2';
    } else {
        document.getElementById('step_2_next').style.backgroundColor = '#cccccc';
    }

    calculation();
}

// Step 2 넘어갈 때 페이지 렌더링
function makeStep2 () {
    var html = '';
    var html2 = '';
    for (var i = 0; i < data.cost.length; i++) {
        html += '<div>';
        html +=     '<div class="input_cost">';
        html +=         '<div class="label label-default ' + (data.cost[i].foc ? '' : 'hide') + '">FOC 적용</div>';
        html +=         '<div class="s2_div">';
        html +=             '<div class="s2_cost">';
        html +=                 '<input type="text" class="cost_name" placeholder="비용을 입력해주세요" value="' + data.cost[i].name + '" disabled />';
        html +=             '</div>';
        html +=             '<div class="cost_p1">';
        html +=                 '<input type="number" class="step2_price_input" placeholder="0" value="' + data.cost[i].price + '" onkeyup="changeStep2Cost()" />';
        html +=                 '<span class="unit" name="number">';
        html +=                     '<select class="step2_price_type" onchange="changeStep2Cost()">';
        for (var j = 0; j < data.exchangerate.length; j++) {
            html +=                     '<option value="' + data.exchangerate[j].name + '" ' + (data.exchangerate[j].name === data.cost[i].priceType ? 'selected' : '') + '>' + data.exchangerate[j].name + '</option>';
        }
        html +=                     '</select>';
        html +=                 '</span>';
        html +=             '</div>';
        html +=             '<span>X</span>';
        html +=             '<div class="cost_p2">';
        html +=                 '<input type="number" class="step2_count_input" placeholder="0" max="999" value="' + data.cost[i].count + '" onkeyup="changeStep2Cost()" />';
        html +=                 '<span class="unit" name="number">';
        html +=                     '<select class="step2_count_type" onchange="changeStep2Cost()">';
        html +=                         '<option value="회" ' + (data.cost[i].countType === '회' ? 'selected' : '') + '>회</option>';
        html +=                         '<option value="박" ' + (data.cost[i].countType === '박' ? 'selected' : '') + '>박</option>';
        html +=                         '<option value="일" ' + (data.cost[i].countType === '일' ? 'selected' : '') + '>일</option>';
        html +=                     '</select>';
        html +=                 '</span>';
        html +=             '</div>';
        html +=             '<div class="step2_input_error" style="font-size: 12px; color: #e02020; display: none;">1인 비용 정보를 입력하세요.</div>';
        html +=             '<div class="cost_check_box_1">';
        html +=                 '<span class="cost_n">';
        html +=                     '<label class="cost_checkbox_container">공동비용';
        html +=                         '<input type="checkbox" class="step2_public_input" onchange="changeStep2Cost()" ' + (data.cost[i].public ? 'checked' : '') + ' />';
        html +=                         '<span class="cost_checkmark"></span>';
        html +=                     '</label>';
        html +=                     '<i data-toggle="modal" role="dialog" href="#cost_detail_1">';
        html +=                         '<img src="/img/ic-help-outline.svg" />';
        html +=                     '</i>';
        html +=                 '</span>';
        if (i === 0) {
            html +=                 '<div class="modal fade" id="cost_detail_1" role="dialog">';
            html +=                     '<div class="modal-dialog">';
            html +=                         '<div class="modal-content">';
            html +=                             '<div class="modal-body">';
            html +=                                 '<div>공동비용</div>';
            html +=                                 '<div>';
            html +=                                     '<span><img src=\'/img/ic-check-box.svg\'></span>';
            html +=                                     '<div class="modal_text">';
            html +=                                         '<p>1/n, 참여자 수만큼 나누는 공동 전체 비용입니다.</p>';
            html +=                                     '</div>';
            html +=                                 '</div>';
            html +=                                 '<div>';
            html +=                                     '<span><img src=\'/img/ic-check-box-outline-blank.svg\'></span>';
            html +=                                     '<div class="modal_text">';
            html +=                                         '<p>1인 당 개별 비용입니다.</p>';
            html +=                                     '</div>';
            html +=                                 '</div>';
            html +=                             '</div>';
            html +=                             '<div class="modal-footer">';
            html +=                                 '<button type="button" data-dismiss="modal">닫기</button>';
            html +=                             '</div>';
            html +=                         '</div>';
            html +=                     '</div>';
            html +=                 '</div>';
        }
        html +=                 '<span class="cost_ins"' + (data.cost[i].foc ? ' style="opacity: 0.3;"' : '') + '>';
        html +=                     '<label class="cost_checkbox_container" disabled>강사비용포함';
        html +=                         '<input type="checkbox" class="step2_include_input"' + (data.cost[i].foc ? ' disabled' : '') + ' onchange="changeStep2Cost()" ' + (data.cost[i].include ? 'checked' : '') + ' />';
        html +=                         '<span class="cost_checkmark"></span>';
        html +=                     '</label>';
        html +=                     '<i data-toggle="modal" role="dialog" href="#cost_detail_2"><img src="/img/ic-help-outline.svg"></i>';
        html +=                 '</span>';
        if (i === 0) {
            html +=                 '<div class="modal fade" id="cost_detail_2" role="dialog">';
            html +=                     '<div class="modal-dialog">';
            html +=                         '<div class="modal-content">';
            html +=                             '<div class="modal-body">';
            html +=                                 '<div>강사비용포함</div>';
            html +=                                 '<div>';
            html +=                                     '<span><img src=\'/img/ic-check-box.svg\'></span>';
            html +=                                     '<div class="modal_text">';
            html +=                                         '<p>교육생이 강사의 비용을 부담합니다.</p>';
            html +=                                     '</div>';
            html +=                                 '</div>';
            html +=                                 '<div>';
            html +=                                     '<span><img src=\'/img/ic-check-box-outline-blank.svg\'></span>';
            html +=                                     '<div class="modal_text">';
            html +=                                         '<p>교육생이 강사의 비용을 부담하지 않습니다.</p>';
            html +=                                     '</div>';
            html +=                                 '</div>';
            html +=                             '</div>';
            html +=                             '<div class="modal-footer">';
            html +=                                 '<button type="button" data-dismiss="modal">닫기</button>';
            html +=                             '</div>';
            html +=                         '</div>';
            html +=                     '</div>';
            html +=                 '</div>';
        }
        html +=             '</div>';
        html +=         '</div>';
        html +=     '</div>';

        html +=     '<div class="ex_cost">';
        html +=         '<div id="ex_cost_' + i + '" class="collapse">';
        html +=             '<div>';
        html +=                 '<span class="step2_price_tag check1 hide">공동비용지원 체크 시</span>';
        html +=             '</div>';
        html +=             '<div class="ex_cost_detail">';
        html +=                 '<div>1인 비용</div>';
        html +=                 '<span class="step2_formula_1">= 단가 x 횟수</span>';
        html +=                 '<div>';
        html +=                     '<text class="step2_formula_2"></text>';
        html +=                     '<br />';
        html +=                     '<text class="step2_formula_3"></text>';
        html +=                 '</div>';
        html +=             '</div>';
        html +=         '</div>';
        html +=         '<div class="accordion-toggle collapsed" data-toggle="collapse" data-target="#ex_cost_' + i + '">1인 비용 = ';
        html +=             '<text class="step2_formula_result"></text>';
        html +=             '<i><img src="/img/group-16.svg"></i>';
        html +=         '</div>';
        html +=     '</div>';
        html += '</div>';

        if (i === 0) {
            document.getElementById('c_first').innerHTML = html;
            html = '';
        }

        html2 += '<li>';
        html2 +=    '<div>';
        html2 +=        '<span class="s2_FOC_n hide step2_foc_off_tag">FOC 미적용</span>';
        html2 +=        '<span class="s2_FOC_y hide step2_foc_on_tag">FOC 적용</span>';
        html2 +=        '<span class="s2_n_n hide step2_public_off_tag">개인 비용</span>';
        html2 +=        '<span class="s2_n_y hide step2_public_on_tag">공동 비용</span>';
        html2 +=        '<span class="s2_ins_n hide step2_include_off_tag">강사비용 미포함</span>';
        html2 +=        '<span class="s2_ins_y hide step2_include_on_tag">강사비용 포함</span>';
        html2 +=    '</div>';
        html2 +=    '<div class="s2_cost_name">' + data.cost[i].name + '</div>';
        html2 +=    '<div class="s2_cost_ex">';
        html2 +=        '<span>';
        html2 +=            '<text class="step2_formula_4"></text>';
        html2 +=        '</span>';
        html2 +=        '<span class="s2_cost_calc">';
        html2 +=            '<span class="ex_calc step2_formula_5"></span>';
        html2 +=            '<span>';
        html2 +=                '<text class="step2_formula_6 s2_cost_fin"></text>';
        html2 +=            '</span>';
        html2 +=        '</span>';
        html2 +=    '</div>';
        html2 += '</li>';
    }

    if (html !== '') {
        document.getElementById('c_sibling').innerHTML = html;
    }

    if (html2 !== '') {
        document.getElementById('s2_cost_arrange').innerHTML = html2;
    }

    changeStep2Cost();
}

/* Step 3 */
function changeStep3CostExpense () {
    for (var i = 0; i < data.cost.length; i++) {
        if (document.getElementsByClassName('step3_cost_expense_input')[i].value === '') {
            data.cost[i].expense = 0;
        } else {
            data.cost[i].expense = parseInt(document.getElementsByClassName('step3_cost_expense_input')[i].value);
            document.getElementsByClassName('step3_cost_expense_error')[i].style.display = 'none';
        }
    }

    changeStep3Cost();
}

function addAdditionalExpenseItem () {
    data.additional.push({
        name: '',
        price: '',
        priceType: data.currency,
        count: '',
        countType: '',
    });

    var divElement = document.createElement("div");
    divElement.className = 'ex_cost_box';
    var html = '';
    html +=     '<div>';
    html +=         '<span class="s3_FOC_n">FOC 미적용</span>';
    html +=         '<span class="s3_n_y">공동 비용</span>';
    html +=         '<span class="s3_ins_y">강사비용 포함</span>';
    html +=         '<span class="remove_div btn" onclick="deleteAdditionalExpenseItem(this)"><img src="/img/ic-close.svg" /></span>';
    html +=     '</div>';
    html +=     '<div>';
    html +=         '<input class="ex_cost_name step3_additional_expense_name" type="text" placeholder="추가 지출 이름" maxlength="20" onkeyup="changeAdditionalExpenseItem()" />';
    html +=         '<div class="step3_additional_expense_error" style="font-size: 12px; color: rgb(224, 32, 32); display: none;">추가 지출 이름을 입력하세요.</div>';
    html +=     '</div>';
    html +=     '<div class="ex_cost_0_income">';
    html +=         '<text>수입</text>';
    html +=         '<text>0' + data.currency + ' x 1회</text>';
    html +=         '<span>';
    html +=             '<text>0' + data.currency + '</text>';
    html +=         '</span>';
    html +=     '</div>';
    html +=     '<div class="ex_cost_expense">';
    html +=         '<text>지출</text>';
    html +=         '<span class="ex_cost_p1">';
    html +=             '<input type="number" class="step3_additional_expense_price" placeholder="0" onkeyup="changeAdditionalExpenseItem()" />';
    html +=             '<span>';
    html +=                 '<select class="step3_additional_expense_price_type" onchange="changeAdditionalExpenseItem()">';
    for (var j = 0; j < data.exchangerate.length; j++) {
        html +=                 '<option value="' + data.exchangerate[j].name + '" ' + (data.exchangerate[j].name === data.currency ? 'selected' : '') + '>' + data.exchangerate[j].name + '</option>';
    }
    html +=                 '</select>';
    html +=             '</span>';
    html +=         '</span>';
    html +=         '<text class="ex_cost_x">x</text>';
    html +=         '<span class="ex_cost_p2">';
    html +=             '<input type="number" class="step3_additional_expense_count" placeholder="0" max="999" onkeyup="changeAdditionalExpenseItem()" />';
    html +=             '<span>';
    html +=                 '<select class="step3_additional_expense_count_type" onchange="changeAdditionalExpenseItem()">';
    html +=                     '<option value="회" selected>회</option>';
    html +=                     '<option value="박">박</option>';
    html +=                     '<option value="일">일</option>';
    html +=                 '</select>';
    html +=             '</span>';
    html +=         '</span>';
    html +=     '</div>';
    html +=     '<div class="ex_cost_calc">';
    html +=         '<span class="expense">';
    html +=             '<text class="step3_formula_7 hide"></text>';
    html +=         '</span>';
    html +=         '<span class="ex_expense">';
    html +=             '<text class="main_currency step3_formula_8"></text>';
    html +=         '</span>';
    html +=         '<br>';
    html +=         '<span class="revenue step3_formula_9_wrap" style="color: rgb(20, 93, 178);">';
    html +=             '<text>수익: </text>';
    html +=             '<text class="main_currency step3_formula_9"></text>';
    html +=         '</span>';
    html +=     '</div>';
    divElement.innerHTML = html;
    document.getElementById('c_extra_sibling').appendChild(divElement);

    changeStep3Cost();
}

function deleteAdditionalExpenseItem (item) {
    data.additional.splice($(item.parentNode.parentNode).index() + 1, 1);

    item.parentNode.parentNode.remove();

    changeStep3Cost();
}

function changeAdditionalExpenseItem () {
    for (var i = 0; i < data.additional.length; i++) {
        data.additional[i].name = document.getElementsByClassName('step3_additional_expense_name')[i].value;
        data.additional[i].price = document.getElementsByClassName('step3_additional_expense_price')[i].value === '' ? 0 : document.getElementsByClassName('step3_additional_expense_price')[i].value;
        data.additional[i].priceType = document.getElementsByClassName('step3_additional_expense_price_type')[i].value;
        data.additional[i].count = document.getElementsByClassName('step3_additional_expense_count')[i].value === '' ? 0 : document.getElementsByClassName('step3_additional_expense_count')[i].value;
        data.additional[i].countType = document.getElementsByClassName('step3_additional_expense_count_type')[i].value;

        if (document.getElementsByClassName('step3_additional_expense_name')[i].value !== '') {
            document.getElementsByClassName('step3_additional_expense_error')[i].style.display = 'none';
        }
    }

    changeStep3Cost();
}

function changeStep3Cost () {
    var isValid = true;
    var profitPerPerson = 0;

    for (var i = 0; i < data.cost.length; i++) {
        if (document.getElementsByClassName('step3_cost_expense_input')[i].value === '') {
            isValid = false;
        }

        var priceInput = data.cost[i].price;
        var priceType = data.cost[i].priceType;
        var countInput = data.cost[i].count;
        var countType = data.cost[i].countType;

        var basicFormula = priceInput + priceType + ' x ' + countInput + countType;
        var basicCost = priceInput * countInput;
        var basicExpenseCost = data.cost[i].expense * countInput;

        var advancedFormulaText = '';
        var advancedFormula = '';
        var advancedCost = 0;
        var advancedResult = '';
        var advancedExpenseCost = 0;
        var advancedExpenseResult = '';

        var appliedCost = 0;
        var appliedExpenseCost = 0;

        if (data.cost[i].foc) {
            document.getElementsByClassName('step3_foc_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_foc_off_tag')[i].classList.add('hide');
        } else {
            document.getElementsByClassName('step3_foc_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_foc_off_tag')[i].classList.remove('hide');
        }

        if (data.cost[i].public && data.cost[i].include) {
            advancedFormulaText = '단가 x 횟수 / 교육생 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' / ' + bgnCount + '명';
            advancedCost = Math.floor(basicCost / bgnCount * 100) / 100;
            advancedExpenseCost = Math.floor(basicExpenseCost / bgnCount * 100) / 100;

            document.getElementsByClassName('step3_public_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_public_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_include_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_include_off_tag')[i].classList.add('hide');
        } else if (data.cost[i].public) {
            advancedFormulaText = '단가 x 횟수 / 참여자 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' / ' + (bgnCount + insCount) + '명';
            advancedCost = Math.floor(basicCost / (bgnCount + insCount) * 100) / 100;
            advancedExpenseCost = Math.floor(basicExpenseCost / (bgnCount + insCount) * 100) / 100;

            document.getElementsByClassName('step3_public_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_public_off_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_include_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_include_off_tag')[i].classList.remove('hide');
        } else if (data.cost[i].include) {
            advancedFormulaText = '단가 x 횟수 + (단가 x 횟수) x 강사 수 / 교육생 수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType + ' + (' + priceInput + priceType + ' x ' + countInput + countType + ') x ' + insCount + '명' + ' / ' + bgnCount + '명';
            advancedCost = Math.floor((basicCost + basicCost * insCount / bgnCount) * 100) / 100;
            advancedExpenseCost = Math.floor((basicExpenseCost + basicExpenseCost * insCount / bgnCount) * 100) / 100;

            document.getElementsByClassName('step3_public_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_public_off_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_include_on_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_include_off_tag')[i].classList.add('hide');
        } else {
            advancedFormulaText = '단가 x 횟수';
            advancedFormula = priceInput + priceType + ' x ' + countInput + countType;
            advancedCost = Math.floor(basicCost * 100) / 100;
            advancedExpenseCost = Math.floor(basicExpenseCost * 100) / 100;

            document.getElementsByClassName('step3_public_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_public_off_tag')[i].classList.remove('hide');
            document.getElementsByClassName('step3_include_on_tag')[i].classList.add('hide');
            document.getElementsByClassName('step3_include_off_tag')[i].classList.remove('hide');
        }

        advancedResult = advancedCost + priceType;
        advancedExpenseResult = advancedExpenseCost + priceType;
        if (data.cost[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.cost[i].priceType === data.exchangerate[j].type) {
                    appliedCost = Math.floor(advancedCost * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                    appliedExpenseCost = Math.floor(advancedExpenseCost * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        } else {
            appliedCost = advancedCost;
            appliedExpenseCost = advancedExpenseCost;
        }

        var tempProfitPerPerson = 0;
        if (appliedCost - appliedExpenseCost < 0) {
            tempProfitPerPerson = Math.ceil((appliedCost - appliedExpenseCost) * 100) / 100;
        } else {
            tempProfitPerPerson = Math.floor((appliedCost - appliedExpenseCost) * 100) / 100;
        }
        document.getElementsByClassName('step3_formula_1')[i].innerHTML = basicFormula;
        document.getElementsByClassName('step3_formula_2')[i].innerHTML = advancedResult + ' = ';
        document.getElementsByClassName('step3_formula_3')[i].innerHTML = appliedCost + data.currency;
        document.getElementsByClassName('step3_formula_4')[i].innerHTML = advancedExpenseResult + ' = ';
        document.getElementsByClassName('step3_formula_5')[i].innerHTML = appliedExpenseCost + data.currency;
        document.getElementsByClassName('step3_formula_6')[i].innerHTML = tempProfitPerPerson + data.currency;
        if (appliedCost - appliedExpenseCost < 0) {
            document.getElementsByClassName('s3_cost_revenue')[i].style.color = 'rgb(224, 32, 32)';
        } else {
            document.getElementsByClassName('s3_cost_revenue')[i].style.color = 'rgb(20, 93, 178)';
        }

        if (data.cost[i].priceType !== data.currency) {
            document.getElementsByClassName('step3_formula_2')[i].classList.remove('hide');
            document.getElementsByClassName('step3_formula_4')[i].classList.remove('hide');
        } else {
            document.getElementsByClassName('step3_formula_2')[i].classList.add('hide');
            document.getElementsByClassName('step3_formula_4')[i].classList.add('hide');
        }

        profitPerPerson += tempProfitPerPerson;
    }

    var expensePerPerson = 0;
    for (i = 0; i < data.additional.length; i++) {
        var additionalExpenseCost = Math.floor(data.additional[i].price * data.additional[i].count / bgnCount * 100) / 100;
        var appliedAdditionalExpenseCost = 0;
        if (data.additional[i].priceType !== data.currency) {
            for (j = 0; j < data.exchangerate.length; j++) {
                if (data.additional[i].priceType === data.exchangerate[j].type) {
                    appliedAdditionalExpenseCost = Math.floor(additionalExpenseCost * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        } else {
            appliedAdditionalExpenseCost = additionalExpenseCost;
        }
        var additionalExpensePriceType = data.additional[i].priceType;
        if (additionalExpensePriceType === '') {
            additionalExpensePriceType = data.currency;
        }

        document.getElementsByClassName('step3_formula_7')[i].innerHTML = additionalExpenseCost + additionalExpensePriceType + ' = ';
        document.getElementsByClassName('step3_formula_8')[i].innerHTML = appliedAdditionalExpenseCost + data.currency;
        document.getElementsByClassName('step3_formula_9')[i].innerHTML = (appliedAdditionalExpenseCost * -1) + data.currency;
        if (appliedAdditionalExpenseCost > 0) {
            document.getElementsByClassName('step3_formula_9_wrap')[i].style.color = '#e02020';
        } else {
            document.getElementsByClassName('step3_formula_9_wrap')[i].style.color = '#145db2';
        }

        if (data.additional[i].priceType !== data.currency) {
            document.getElementsByClassName('step3_formula_7')[i].classList.remove('hide');
        } else {
            document.getElementsByClassName('step3_formula_7')[i].classList.add('hide');
        }

        expensePerPerson -= appliedAdditionalExpenseCost;

        if (data.additional[i].price !== '' && data.additional[i].price !== 0 &&
            data.additional[i].count !== '' && data.additional[i].count !== 0 &&
            document.getElementsByClassName('step3_additional_expense_name')[i].value === '') {
            isValid = false;
        }
    }

    if (isValid) {
        document.getElementById('step_3_next').style.backgroundColor = '#145db2';
    } else {
        document.getElementById('step_3_next').style.backgroundColor = '#cccccc';
    }

    calculation();
}

function makeStep3 () {
    var html = '';
    for (var i = 0; i < data.cost.length; i++) {
        html += '<li>';
        html +=     '<div>';
        html +=         '<span class="s3_FOC_n hide step3_foc_off_tag">FOC 미적용</span>';
        html +=         '<span class="s3_FOC_y hide step3_foc_on_tag">FOC 적용</span>';
        html +=         '<span class="s3_n_n hide step3_public_off_tag">개인 비용</span>';
        html +=         '<span class="s3_n_y hide step3_public_on_tag">공동 비용</span>';
        html +=         '<span class="s3_ins_n hide step3_include_off_tag">강사비용 미포함</span>';
        html +=         '<span class="s3_ins_y hide step3_include_on_tag">강사비용 포함</span>';
        html +=     '</div>';
        html +=     '<div class="s3_cost_name">' + data.cost[i].name + '</div>';
        html +=     '<div class="s3_cost_income">';
        html +=         '<span>';
        html +=             '<text>수입</text>';
        html +=             '<text class="s3_cost_p1 step3_formula_1"></text>';
        html +=         '</span>';
        html +=         '<span class="s3_calc_income">';
        html +=             '<span class="ex_calc">';
        html +=                 '<text class="cost3 step3_formula_2 hide"></text>';
        html +=             '</span>';
        html +=             '<span>';
        html +=                 '<text class="s3_cost_fin step3_formula_3"></text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        html +=     '<div class="s3_cost_expense">';
        html +=         '<span>';
        html +=             '<text>지출</text>';
        html +=             '<input type="number" class="step3_cost_expense_input" value="' + data.cost[i].expense + '" placeholder="0" onkeyup="changeStep3CostExpense()">';
        html +=             '<text class="s3_cost_currency">' + data.cost[i].priceType + '</text>';
        html +=             '<text> x </text>';
        html +=             '<text class="s3_cost_p2">' + data.cost[i].count + '</text>';
        html +=             '<text class="s3_cost_unit">' + data.cost[i].countType + '</text>';
        html +=         '</span>';
        html +=         '<span class="s3_calc_expense">';
        html +=             '<span class="ex_calc">';
        html +=                 '<text class="cost3_expense step3_formula_4 hide"></text>';
        html +=             '</span>';
        html +=             '<span>';
        html +=                 '<text class="s3_cost_fin_expense step3_formula_5"></text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=         '<div class="step3_cost_expense_error" style="font-size: 12px;color: rgb(224, 32, 32); display: none;">지출 금액을 입력하세요.</div>';
        html +=     '</div>';
        html +=     '<div class="s3_cost_revenue">';
        html +=         '수익:';
        html +=         '<text class="s3_calc_revenue step3_formula_6"></text>';
        html +=     '</div>';
        html += '</li>';
    }

    document.getElementById('step3_real_expense_list').innerHTML = html;

    html = '';
    for (i = 0; i < data.additional.length; i++) {
        html += '<div class="ex_cost_box">';
        html +=     '<div>';
        html +=         '<span class="s3_FOC_n">FOC 미적용</span>';
        html +=         '<span class="s3_n_y">공동 비용</span>';
        html +=         '<span class="s3_ins_y">강사비용 포함</span>';
        html +=         '<span class="remove_div btn" onclick="deleteAdditionalExpenseItem(this)"><img src="/img/ic-close.svg" /></span>';
        html +=     '</div>';
        html +=     '<div>';
        html +=         '<input class="ex_cost_name step3_additional_expense_name" type="text" placeholder="추가 지출 이름" maxlength="20" value="' + data.additional[i].name + '" onkeyup="changeAdditionalExpenseItem()" />';
        html +=         '<div class="step3_additional_expense_error" style="font-size: 12px; color: rgb(224, 32, 32); display: none;">추가 지출 이름을 입력하세요.</div>';
        html +=     '</div>';
        html +=     '<div class="ex_cost_0_income">';
        html +=         '<text>수입</text>';
        html +=         '<text>0' + data.currency + ' x 1회</text>';
        html +=         '<span>';
        html +=             '<text>0' + data.currency + '</text>';
        html +=         '</span>';
        html +=     '</div>';
        html +=     '<div class="ex_cost_expense">';
        html +=         '<text>지출</text>';
        html +=         '<span class="ex_cost_p1">';
        html +=             '<input type="number" class="step3_additional_expense_price" placeholder="0" value="' + data.additional[i].price + '" onkeyup="changeAdditionalExpenseItem()" />';
        html +=             '<span>';
        html +=                 '<select class="step3_additional_expense_price_type" onchange="changeAdditionalExpenseItem()">';
        for (var j = 0; j < data.exchangerate.length; j++) {
            html +=                 '<option value="' + data.exchangerate[j].name + '" ' + (data.additional[i].priceType === '' ? (data.exchangerate[j].name === data.currency ? 'selected' : '') : (data.exchangerate[j].name === data.additional[i].priceType ? 'selected' : '')) + '>' + data.exchangerate[j].name + '</option>';
        }
        html +=                 '</select>';
        html +=             '</span>';
        html +=         '</span>';
        html +=         '<text class="ex_cost_x">x</text>';
        html +=         '<span class="ex_cost_p2">';
        html +=             '<input type="number" class="step3_additional_expense_count" placeholder="0" max="999" value="' + data.additional[i].count + '" onkeyup="changeAdditionalExpenseItem()" />';
        html +=             '<span>';
        html +=                 '<select class="step3_additional_expense_count_type" onchange="changeAdditionalExpenseItem()">';
        html +=                     '<option value="회" ' + (data.additional[i].countType === '회' ? 'selected' : '') + '>회</option>';
        html +=                     '<option value="박" ' + (data.additional[i].countType === '박' ? 'selected' : '') + '>박</option>';
        html +=                     '<option value="일" ' + (data.additional[i].countType === '일' ? 'selected' : '') + '>일</option>';
        html +=                 '</select>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        html +=     '<div class="ex_cost_calc">';
        html +=         '<span class="expense">';
        html +=             '<text class="step3_formula_7 hide"></text>';
        html +=         '</span>';
        html +=         '<span class="ex_expense">';
        html +=             '<text class="main_currency step3_formula_8"></text>';
        html +=         '</span>';
        html +=         '<br>';
        html +=         '<span class="revenue step3_formula_9_wrap" style="color: rgb(20, 93, 178);">';
        html +=             '<text>수익: </text>';
        html +=             '<text class="main_currency step3_formula_9"></text>';
        html +=         '</span>';
        html +=     '</div>';
        html += '</div>';

        if (i === 0) {
            document.getElementById('c_extra_first').innerHTML = html;
            html = '';
        }
    }

    document.getElementById('c_extra_sibling').innerHTML = html;

    changeStep3Cost();
}


/* Step 4 */
function makeStep4 () {
    var slideMinProfit = parseInt(document.getElementById('step3_summery_profit_per_person').innerHTML);
    if (slideMinProfit < 0) {
        document.getElementById('slide-range').setAttribute('min', slideMinProfit);
        document.getElementById('step4_slide_min_text').innerHTML = slideMinProfit;
    } else {
        document.getElementById('slide-range').setAttribute('min', '0');
        document.getElementById('step4_slide_min_text').innerHTML = '0';
    }
    if (data.currency === '원' && slideMinProfit <= 150000) {
        document.getElementById('slide-range').setAttribute('max', '150000');
        document.getElementById('step4_slide_max_text').innerHTML = '150000';
    } else if (data.currency === '달러' && slideMinProfit <= 150) {
        document.getElementById('slide-range').setAttribute('max', '150');
        document.getElementById('step4_slide_max_text').innerHTML = '150';
    } else if (data.currency === '엔' && slideMinProfit <= 1500) {
        document.getElementById('slide-range').setAttribute('max', '1500');
        document.getElementById('step4_slide_max_text').innerHTML = '1500';
    } else if (data.currency === '페소' && slideMinProfit <= 1500) {
        document.getElementById('slide-range').setAttribute('max', '1500');
        document.getElementById('step4_slide_max_text').innerHTML = '1500';
    } else if (data.currency === '유로' && slideMinProfit <= 150) {
        document.getElementById('slide-range').setAttribute('max', '150');
        document.getElementById('step4_slide_max_text').innerHTML = '150';
    } else {
        document.getElementById('slide-range').setAttribute('max', slideMinProfit);
        document.getElementById('step4_slide_max_text').innerHTML = slideMinProfit;
    }

    document.getElementById('slide-range').value = slideMinProfit;
    document.getElementById('s4_control_revenue').value = data.adjustment.price;
    document.getElementById('step4_slide_cost_name').value = data.adjustment.name;
    document.getElementById('s4_control_income').innerHTML = '0' + data.currency;
    document.getElementById('step4_control_cost_type').innerHTML = data.currency;

    var html = '';
    for (var i = 0; i < data.cost.length; i++) {
        var costPrice = data.cost[i].price === '' ? 0 : data.cost[i].price;
        var costCount = data.cost[i].count === '' ? 0 : data.cost[i].count;
        var costExpense = data.cost[i].expense === '' ? 0 : data.cost[i].expense;
        var basicIncome = costPrice * costCount;
        var basicExpense = costExpense * costCount;

        if (data.cost[i].public && data.cost[i].include) {
            income = Math.floor(basicIncome / bgnCount * 100) / 100;
            expense = Math.floor(basicExpense / bgnCount * 100) / 100;
        } else if (data.cost[i].public) {
            income = Math.floor(basicIncome / (bgnCount + insCount) * 100) / 100;
            expense = Math.floor(basicExpense / (bgnCount + insCount) * 100) / 100;
        } else if (data.cost[i].include) {
            income = Math.floor((basicIncome + basicIncome * insCount / bgnCount) * 100) / 100;
            expense = Math.floor((basicExpense + basicExpense * insCount / bgnCount) * 100) / 100;
        } else {
            income = Math.floor(basicIncome * 100) / 100;
            expense = Math.floor(basicExpense * 100) / 100;
        }

        if (data.cost[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.cost[i].priceType === data.exchangerate[j].type) {
                    income = Math.floor(income * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                    expense = Math.floor(expense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        }

        var tempProfit = 0;
        if (income - expense < 0) {
            tempProfit = Math.ceil((income - expense) * 100) / 100;
        } else {
            tempProfit = Math.floor((income - expense) * 100) / 100;
        }

        html += '<tr>';
        html += '<th class="s4_cost_name">' + data.cost[i].name + '</th>';
        html += '<td class="s4_income">';
        html += '<text>' + income + data.currency + '</text>';
        html += '</td>';
        if (income - expense < 0) {
            html += '<td class="s4_revenue" style="color: #e02020">';
        } else {
            html += '<td class="s4_revenue">';
        }
        html +=         '<text class="step4_revenue_text">' + tempProfit + data.currency + '</text>';
        html +=     '</td>';
        html += '</tr>';
    }
    for (i = 0; i < data.additional.length; i++) {
        var additionalPrice = (data.additional[i].price === '' ? 0 : data.additional[i].price);
        var additionalCount = (data.additional[i].count === '' ? 0 : data.additional[i].count);
        var additionalExpense = Math.floor(additionalPrice * additionalCount / bgnCount * 100) / 100;

        // 추가 지출 비용이 0원이면 노출하지 않음
        if (additionalExpense === 0) {
            continue;
        }

        if (data.additional[i].priceType !== data.currency) {
            for (j = 0; j < data.exchangerate.length; j++) {
                if (data.additional[i].priceType === data.exchangerate[j].type) {
                    additionalExpense = Math.floor(additionalExpense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        }

        html += '<tr>';
        html +=     '<th class="s4_cost_name">' + data.additional[i].name + '</th>';
        html +=     '<td class="s4_income">';
        html +=         '<text>0' + data.currency + '</text>';
        html +=     '</td>';
        if (additionalExpense > 0) {
            html +=     '<td class="s4_revenue" style="color: #e02020">';
        } else {
            html +=     '<td class="s4_revenue" style="color: #145db2">';
        }
        html +=         '<text class="step4_revenue_text">' + (additionalExpense * -1) + data.currency + '</text>';
        html +=     '</td>';
        html += '</tr>';
    }
    document.getElementById('step4_cost_list').innerHTML = html;

    changeSlideCost();
}

function changeSlideCost (type) {
    if (type !== undefined) {
        var profit = 0;
        for (var i = 0; i < document.getElementsByClassName('step4_revenue_text').length; i++) {
            profit += parseFloat(document.getElementsByClassName('step4_revenue_text')[i].innerHTML);
        }
        profit = Math.round(profit * 100) / 100;

        if (type === 'slide') {
            var tempValue = parseFloat(document.getElementById('slide-range').value);
            document.getElementById('s4_control_revenue').value = Math.round((tempValue - profit) * 100) / 100;
        } else if (type === 'input') {
            var tempValue = document.getElementById('s4_control_revenue').value === '' ? 0 : parseFloat(document.getElementById('s4_control_revenue').value);
            document.getElementById('slide-range').value = Math.round((tempValue + profit) * 100) / 100;
        }
    }

    var isValid = true;
    if (document.getElementById('s4_control_revenue').value === '' ||
        document.getElementById('step4_slide_cost_name').value === '') {
        isValid = false;
    } else {
        document.getElementById('step4_slide_cost_error').style.display = 'none';
    }

    var slideCost = document.getElementById('s4_control_revenue').value === '' ? 0 : Math.round(document.getElementById('s4_control_revenue').value * 100) / 100;

    if (slideCost < 0) {
        document.getElementById('s4_control_revenue').style.color = 'rgb(224, 32, 32)';
        document.getElementById('step4_control_cost_type').style.color = 'rgb(224, 32, 32)';
    } else {
        document.getElementById('s4_control_revenue').style.color = 'rgb(20, 93, 178)';
        document.getElementById('step4_control_cost_type').style.color = 'rgb(20, 93, 178)';
    }

    data.adjustment.price = slideCost;
    data.adjustment.name = document.getElementById('step4_slide_cost_name').value;

    if (isValid) {
        document.getElementById('step_4_next').style.backgroundColor = '#145db2';
    } else {
        document.getElementById('step_4_next').style.backgroundColor = '#cccccc';
    }

    calculation();
}


function makeStep5 () {
    var html = '';
    for (var i = 0; i < data.cost.length; i++) {
        var basicIncome = data.cost[i].price * data.cost[i].count;
        var basicExpense = data.cost[i].expense * data.cost[i].count;
        var income = 0;
        var expense = 0;
        var appliedIncome = 0;
        var appliedExpense = 0;
        if (data.cost[i].public && data.cost[i].include) {
            income = Math.floor(basicIncome / bgnCount * 100) / 100;
            expense = Math.floor(basicExpense / bgnCount * 100) / 100;
        } else if (data.cost[i].public) {
            income = Math.floor(basicIncome / (bgnCount + insCount) * 100) / 100;
            expense = Math.floor(basicExpense / (bgnCount + insCount) * 100) / 100;
        } else if (data.cost[i].include) {
            income = Math.floor((basicIncome + basicIncome * insCount / bgnCount) * 100) / 100;
            expense = Math.floor((basicExpense + basicExpense * insCount / bgnCount) * 100) / 100;
        } else {
            income = Math.floor(basicIncome * 100) / 100;
            expense = Math.floor(basicExpense * 100) / 100;
        }

        if (data.cost[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.cost[i].priceType === data.exchangerate[j].type) {
                    appliedIncome = Math.floor(income * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                    appliedExpense = Math.floor(expense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        } else {
            appliedIncome = income;
            appliedExpense = expense;
        }

        html += '<li>';
        html +=     '<div>';
        if (data.cost[i].foc) {
            html +=         '<span class="s5_FOC_y">FOC 적용</span>';
        } else {
            html +=         '<span class="s5_FOC_n">FOC 미적용</span>';
        }
        if (data.cost[i].public) {
            html +=         '<span class="s5_n_y">공동 비용</span>';
        } else {
            html +=         '<span class="s5_n_n">개인 비용</span>';
        }
        if (data.cost[i].include) {
            html +=         '<span class="s5_ins_y">강사비용 포함</span>';
        } else {
            html +=         '<span class="s5_ins_n">강사비용 미포함</span>';
        }

        html +=     '</div>';
        html +=     '<div class="s5_cost_name">' + data.cost[i].name + '</div>';
        html +=     '<div class="s5_cost_income">';
        html +=         '<span>';
        html +=             '<text>수입</text>';
        html +=             '<text class="s5_cost_p1 step5_formula_1">' + data.cost[i].price + data.cost[i].priceType + ' x ' + data.cost[i].count + data.cost[i].countType + '</text>';
        html +=         '</span>';
        html +=         '<span class="s5_calc_income">';
        if (data.cost[i].priceType !== data.currency) {
            html +=             '<span class="ex_calc">';
            html +=                 '<text class="cost3">' + income + data.cost[i].priceType + ' = </text>';
            html +=             '</span>';
        }
        html +=             '<span>';
        html +=                 '<text class="s5_cost_fin">' + appliedIncome + data.currency + '</text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        html +=     '<div class="s5_cost_expense">';
        html +=         '<span>';
        html +=             '<text>지출</text>';
        html +=             '<text class="s5_cost_p1">' + data.cost[i].expense + data.cost[i].priceType + ' x ' + data.cost[i].count + data.cost[i].countType + '</text>';
        html +=         '</span>';
        html +=         '<span class="s5_calc_expense">';
        if (data.cost[i].priceType !== data.currency) {
            html +=             '<span class="ex_calc">';
            html +=                 '<text class="cost3_expense">' + expense + data.cost[i].priceType + ' = </text>';
            html +=             '</span>';
        }
        html +=             '<span>';
        html +=                 '<text class="s5_cost_fin_expense">' + appliedExpense + data.currency + '</text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        if (appliedIncome - appliedExpense < 0) {
            html += '<div class="s5_cost_revenue" style="color: #e02020;">수익: ';
        } else {
            html += '<div class="s5_cost_revenue" style="color: #145db2;">수익: ';
        }

        var tempProfit = 0;
        if (appliedIncome - appliedExpense < 0) {
            tempProfit = Math.ceil((appliedIncome - appliedExpense) * 100) / 100;
        } else {
            tempProfit = Math.floor((appliedIncome - appliedExpense) * 100) / 100;
        }
        html +=         '<text class="s5_calc_revenue">' + tempProfit + data.currency + '</text>';
        html +=     '</div>';
        html += '</li>';
    }
    for (i = 0; i < data.additional.length; i++) {
        var basicExpense = data.additional[i].price * data.additional[i].count;
        var expense = Math.floor(basicExpense / bgnCount * 100) / 100;
        var appliedExpense = 0;

        // 추가 지출 비용이 0원이면 노출하지 않음
        if (expense === 0) {
            continue;
        }

        if (data.additional[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.additional[i].priceType === data.exchangerate[j].type) {
                    appliedExpense = Math.floor(expense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        } else {
            appliedExpense = expense;
        }

        html += '<li>';
        html +=     '<div>';
        html +=         '<span class="s5_FOC_n">FOC 미적용</span>';
        html +=         '<span class="s5_n_y">공동 비용</span>';
        html +=         '<span class="s5_ins_y">강사비용 포함</span>';

        html +=     '</div>';
        html +=     '<div class="s5_cost_name">' + data.additional[i].name + '</div>';
        html +=     '<div class="s5_cost_income">';
        html +=         '<span>';
        html +=             '<text>수입</text>';
        html +=             '<text class="s5_cost_p1 step5_formula_1">0' + data.additional[i].priceType + ' x 1' + data.additional[i].countType + '</text>';
        html +=         '</span>';
        html +=         '<span class="s5_calc_income">';
        if (data.additional[i].priceType !== data.currency) {
            html +=             '<span class="ex_calc">';
            html +=                 '<text class="cost3">0' + data.additional[i].priceType + ' = </text>';
            html +=             '</span>';
        }
        html +=             '<span>';
        html +=                 '<text class="s5_cost_fin">0' + data.currency + '</text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        html +=     '<div class="s5_cost_expense">';
        html +=         '<span>';
        html +=             '<text>지출</text>';
        html +=             '<text class="s5_cost_p1">' + data.additional[i].price + data.additional[i].priceType + ' x ' + data.additional[i].count + data.additional[i].countType + '</text>';
        html +=         '</span>';
        html +=         '<span class="s5_calc_expense">';
        if (data.additional[i].priceType !== data.currency) {
            html +=             '<span class="ex_calc">';
            html +=                 '<text class="cost3_expense">' + expense + data.additional[i].priceType + ' = </text>';
            html +=             '</span>';
        }
        html +=             '<span>';
        html +=                 '<text class="s5_cost_fin_expense">' + appliedExpense + data.currency + '</text>';
        html +=             '</span>';
        html +=         '</span>';
        html +=     '</div>';
        if (appliedExpense > 0) {
            html += '<div class="s5_cost_revenue" style="color: #e02020;">수익: ';
        } else {
            html += '<div class="s5_cost_revenue" style="color: #145db2;">수익: ';
        }
        html +=         '<text class="s5_calc_revenue">' + (appliedExpense * -1) + data.currency + '</text>';
        html +=     '</div>';
        html += '</li>';
    }

    html += '<li>';
    html +=     '<div>';
    html +=         '<span class="s5_FOC_n">FOC 미적용</span>';
    html +=         '<span class="s5_n_n">개인 비용</span>';
    html +=         '<span class="s5_ins_n">강사비용 미포함</span>';
    html +=     '</div>';
    html +=     '<div class="s5_cost_name">' + data.adjustment.name + '</div>';
    html +=     '<div class="s5_cost_income">';
    html +=         '<span>';
    html +=             '<text>수입</text>';
    if (data.adjustment.price >= 0) {
        html += '<text class="s5_cost_p1 step5_formula_1">' + data.adjustment.price + data.currency + ' x 1회</text>';
    } else {
        html += '<text class="s5_cost_p1 step5_formula_1">0' + data.currency + ' x 1회</text>';
    }
    html +=         '</span>';
    html +=         '<span class="s5_calc_income">';
    html +=             '<span>';
    if (data.adjustment.price >= 0) {
        html +=                 '<text class="s5_cost_fin">' + data.adjustment.price + data.currency + '</text>';
    } else {
        html +=                 '<text class="s5_cost_fin">0' + data.currency + '</text>';
    }
    html +=             '</span>';
    html +=         '</span>';
    html +=     '</div>';
    html +=     '<div class="s5_cost_expense">';
    html +=         '<span>';
    html +=             '<text>지출</text>';
    if (data.adjustment.price >= 0) {
        html +=             '<text class="s5_cost_p1">0' + data.currency + ' x 1회</text>';
    } else {
        html +=             '<text class="s5_cost_p1">' + (data.adjustment.price * -1) + data.currency + ' x 1회</text>';
    }
    html +=         '</span>';
    html +=         '<span class="s5_calc_expense">';
    html +=             '<span>';
    if (data.adjustment.price >= 0) {
        html +=                 '<text class="s5_cost_fin_expense">0' + data.currency + '</text>';
    } else {
        html +=                 '<text class="s5_cost_fin_expense">' + (data.adjustment.price * -1) + data.currency + '</text>';
    }
    html +=             '</span>';
    html +=         '</span>';
    html +=     '</div>';
    if (data.adjustment.price < 0) {
        html += '<div class="s5_cost_revenue" style="color: #e02020;">수익: ';
    } else {
        html += '<div class="s5_cost_revenue" style="color: #145db2;">수익: ';
    }
    html +=         '<text class="s5_calc_revenue">' + data.adjustment.price + data.currency + '</text>';
    html +=     '</div>';
    html += '</li>';

    document.getElementById('step5_cost_list').innerHTML = html;
}


















function calculation () {
    var incomePerPerson = 0;
    var expensePerPerson = 0;
    var income = 0;
    var expense = 0;
    for (var i = 0; i < data.cost.length; i++) {
        var costPrice = data.cost[i].price === '' ? 0 : data.cost[i].price;
        var costCount = data.cost[i].count === '' ? 0 : data.cost[i].count;
        var costExpense = data.cost[i].expense === '' ? 0 : data.cost[i].expense;
        var basicIncome = costPrice * costCount;
        var basicExpense = costExpense * costCount;

        if (data.cost[i].public && data.cost[i].include) {
            income = Math.floor(basicIncome / bgnCount * 100) / 100;
            expense = Math.floor(basicExpense / bgnCount * 100) / 100;
        } else if (data.cost[i].public) {
            income = Math.floor(basicIncome / (bgnCount + insCount) * 100) / 100;
            expense = Math.floor(basicExpense / (bgnCount + insCount) * 100) / 100;
        } else if (data.cost[i].include) {
            income = Math.floor((basicIncome + basicIncome * insCount / bgnCount) * 100) / 100;
            expense = Math.floor((basicExpense + basicExpense * insCount / bgnCount) * 100) / 100;
        } else {
            income = Math.floor(basicIncome * 100) / 100;
            expense = Math.floor(basicExpense * 100) / 100;
        }

        if (data.cost[i].priceType !== data.currency) {
            for (var j = 0; j < data.exchangerate.length; j++) {
                if (data.cost[i].priceType === data.exchangerate[j].type) {
                    income = Math.floor(income * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                    expense = Math.floor(expense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        }

        incomePerPerson += income;
        expensePerPerson += expense;
    }
    incomePerPerson += data.adjustment.price;

    for (i = 0; i < data.additional.length; i++) {
        var additionalPrice = (data.additional[i].price === '' ? 0 : data.additional[i].price);
        var additionalCount = (data.additional[i].count === '' ? 0 : data.additional[i].count);
        var additionalExpense = Math.floor(additionalPrice * additionalCount / bgnCount * 100) / 100;
        if (data.additional[i].priceType !== data.currency) {
            for (j = 0; j < data.exchangerate.length; j++) {
                if (data.additional[i].priceType === data.exchangerate[j].type) {
                    additionalExpense = Math.floor(additionalExpense * data.exchangerate[j].price * data.exchangerate[j].rate * 100) / 100;
                }
            }
        }
        expensePerPerson += additionalExpense;
    }

    incomePerPerson = Math.floor(incomePerPerson * 100) / 100;
    var profitPerPerson = 0;
    if (incomePerPerson - expensePerPerson < 0) {
        profitPerPerson = Math.ceil((incomePerPerson - expensePerPerson) * 100) / 100;
    } else {
        profitPerPerson = Math.floor((incomePerPerson - expensePerPerson) * 100) / 100;
    }
    var totalProfit = Math.floor(profitPerPerson * bgnCount * 100) / 100;

    document.getElementById('step2_summery_income_per_person').innerHTML = parseInt(incomePerPerson) + data.currency;
    document.getElementById('step3_summery_income_per_person').innerHTML = parseInt(incomePerPerson) + data.currency;
    document.getElementById('step4_summery_income_per_person').innerHTML = parseInt(incomePerPerson) + data.currency;
    document.getElementById('step5_summery_income_per_person').innerHTML = parseInt(incomePerPerson) + data.currency;
    document.getElementById('step2_summery_profit_per_person').innerHTML = parseInt(profitPerPerson) + data.currency;
    document.getElementById('step3_summery_profit_per_person').innerHTML = parseInt(profitPerPerson) + data.currency;
    document.getElementById('step4_summery_profit_per_person').innerHTML = parseInt(profitPerPerson) + data.currency;
    document.getElementById('step5_summery_profit_per_person').innerHTML = parseInt(profitPerPerson) + data.currency;
    document.getElementById('step2_summery_profit').innerHTML = parseInt(totalProfit) + data.currency;
    document.getElementById('step3_summery_profit').innerHTML = parseInt(totalProfit) + data.currency;
    document.getElementById('step4_summery_profit').innerHTML = parseInt(totalProfit) + data.currency;
    document.getElementById('step5_summery_profit').innerHTML = parseInt(totalProfit) + data.currency;

    document.getElementById('step5_summery_income_per_person_hidden').innerHTML = incomePerPerson + data.currency;
    document.getElementById('step5_summery_profit_per_person_hidden').innerHTML = profitPerPerson + data.currency;
    document.getElementById('step5_summery_profit_hidden').innerHTML = totalProfit + data.currency;

    document.getElementById('step4_income_text').innerHTML = parseInt(incomePerPerson) + data.currency;
    document.getElementById('step4_profit_text').innerHTML = parseInt(profitPerPerson) + data.currency;
    if (profitPerPerson < 0) {
        document.getElementById('step4_profit_text_wrap').style.color = 'rgb(224, 32, 32)';
        document.getElementById('slide-range').style.background = 'rgba(224, 32, 32, 0.3)';
        document.getElementById('slide-range').classList.add('red');
    } else {
        document.getElementById('step4_profit_text_wrap').style.color = 'rgb(20, 93, 178)';
        document.getElementById('slide-range').style.background = 'rgba(20, 93, 178, 0.3)';
        document.getElementById('slide-range').classList.remove('red');
    }

    document.getElementById('step5_cost_result').innerHTML = parseInt(incomePerPerson) + data.currency;
}