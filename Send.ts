/**
 * Send interface to send contents of linesArray to destinations set in
 * addressList. It cam be sent by WhatsApp or e-mail and will be automatically
 * selected by destination addres in addressList.
 * 
 * Create a dynamic field with logo, send button and destination menu.
 */

type TAddressList = Array<[string,string]>;

interface SendInterface {
    thispanel: any;
    isMobile: boolean;
    input_name: HTMLInputElement | null;
    input_class: HTMLInputElement | null;
    menu_sendto: HTMLSelectElement | null;
    button_send: HTMLButtonElement | null;
    td_logo: HTMLTableCellElement | null;
    addressList?: TAddressList | null;
    linesArray?: Array<string> | null;
    alertMessage?: string | null;
    isphone: Function;
    isemail: Function;
    setDestination: Function;
    destination: string;
    init: Function;
    openTarget: Function;
    buildMessageBody: Function;
    sendWhatsAppMessage: Function;
    sendEmailMessage: Function;
    sendMessage: Function;
}

const Send: SendInterface = {
    thispanel: null,
    isMobile: false,
    input_name: null,
    input_class: null,
    menu_sendto: null,
    button_send: null,
    td_logo: null,
    destination: "",

    isphone: function(): boolean {
        return /[0-9]{12,13}/i.test(Send.destination);
    },

    isemail: function(): boolean {
        return /[^\ \t\n\r\@]+\@[^\ \t\n\r\@]+/i.test(Send.destination);
    },

    setDestination: function(event: Event) {
        Send.destination = (Send.addressList as any)[(Send.menu_sendto as any).selectedIndex][1];
        if (Send.isphone()) {
            (Send.td_logo as any).innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='28' height='28' xmlns:v='https://vecta.io/nano'><defs><image id='A' width='28' height='28' xlink:href='data:image/png;base64,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'/><linearGradient id='B' gradientUnits='userSpaceOnUse' x1='13.734' y1='5.19' x2='13.833' y2='21.849'><stop offset='0' stop-color='rgb(34.117647%,81.960784%,38.823529%)'/><stop offset='1' stop-color='rgb(13.72549%,70.196078%,22.745098%)'/></linearGradient><path id='C' d='M13.938 4.02c-5.395 0-9.777 4.371-9.781 9.742 0 1.844.516 3.637 1.496 5.188l.23.367-.984 3.598 3.699-.969.355.211a9.79 9.79 0 0 0 4.977 1.359h.004c5.387 0 9.773-4.371 9.777-9.746a9.66 9.66 0 0 0-2.863-6.891c-1.844-1.844-4.301-2.855-6.91-2.859zm0 0'/></defs><use xlink:href='#A'/><path d='M2.074 25.699l1.668-6.074a11.68 11.68 0 0 1-1.57-5.863C2.176 7.301 7.449 2.039 13.934 2.039c3.145.004 6.098 1.223 8.32 3.438s3.441 5.164 3.441 8.297c-.004 6.461-5.281 11.723-11.762 11.723h-.004a11.83 11.83 0 0 1-5.621-1.43zm0 0' fill='rgb(100%,100%,100%)'/><use xlink:href='#C' fill='rgb(0%,0%,0%)'/><use xlink:href='#C' fill='url(#B)'/><path d='M10.992 8.863c-.219-.488-.449-.5-.66-.508l-.562-.008c-.195 0-.516.074-.785.367S7.957 9.719 7.957 11.16s1.055 2.832 1.199 3.027 2.035 3.25 5.02 4.426c2.484.973 2.988.781 3.527.73s1.738-.707 1.984-1.391.246-1.27.172-1.395-.27-.195-.562-.34l-2.008-.953c-.27-.098-.469-.148-.664.145s-.758.953-.93 1.148-.344.219-.637.074-1.238-.457-2.363-1.453c-.875-.777-1.465-1.738-1.633-2.031s-.02-.449.129-.598c.129-.129.293-.34.438-.512s.199-.293.297-.488.047-.367-.027-.516-.645-1.594-.906-2.172' fill-rule='evenodd' fill='rgb(100%,100%,100%)'/></svg>";
        }
        else if (Send.isemail()) {
            (Send.td_logo as any).innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' xmlns:v='https://vecta.io/nano'><defs><linearGradient id='A' gradientUnits='userSpaceOnUse' x1='14.195' y1='27.841' x2='14.223' y2='.383'><stop offset='0' stop-color='rgb(43.921569%,93.72549%,100%)'/><stop offset='1' stop-color='rgb(34.117647%,43.921569%,100%)'/></linearGradient></defs><path d='M6.449.047h15.102a6.39 6.39 0 0 1 6.402 6.402v15.102a6.39 6.39 0 0 1-6.402 6.402H6.449a6.39 6.39 0 0 1-6.402-6.402V6.449A6.39 6.39 0 0 1 6.449.047zm0 0' fill='url(#A)'/><path d='M6.16 7.984a1.13 1.13 0 0 0-.414.074l2.625 2.703 2.652 2.754.051.059.156.156.152.164 2.277 2.336c.039.023.148.125.234.168a.87.87 0 0 0 .355.109.83.83 0 0 0 .387-.094c.09-.043.133-.105.234-.184l2.637-2.727 2.664-2.742 2.57-2.645a1.13 1.13 0 0 0-.543-.133zm-.805.328c-.277.266-.453.664-.453 1.113V18.3a1.57 1.57 0 0 0 .309.949l.367-.348 2.742-2.664 2.434-2.355-.047-.059-2.668-2.742-2.664-2.75zm17.734.086l-2.598 2.684-2.656 2.742-.047.051 2.527 2.449 2.742 2.668.168.152c.145-.234.23-.527.23-.844V9.426a1.57 1.57 0 0 0-.367-1.027zm-12.027 5.805L8.64 16.558l-2.75 2.664-.352.34c.184.117.395.191.621.191h16.039a1.15 1.15 0 0 0 .727-.27l-.176-.176L20 16.645l-2.531-2.441-2.277 2.344c-.121.082-.207.176-.324.23-.195.09-.406.164-.621.16s-.422-.086-.613-.18c-.098-.047-.148-.094-.262-.191zm0 0' fill='rgb(100%,100%,100%)'/></svg>";
        }
        else {
            (Send.td_logo as any).innerHTML = "";
        }
    },

    init: function(panel: string, addressList?: TAddressList, linesArray?: Array<string>, alertMessage?: string) {
        Send.thispanel = $.i(panel);
        Send.addressList = (addressList)?addressList:null;
        Send.linesArray = (linesArray)?linesArray:null;
        Send.alertMessage = (alertMessage)?alertMessage:null;
        if (!!Send.addressList && !! Send.linesArray) {
            // Test if mobile browser. Source: http://detectmobilebrowsers.com/
            Send.isMobile = (function(a){
                return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4));    
            })(navigator.userAgent||navigator.vendor||(window as any).opera);
            // Table creation.
            let table_send = $.create('table',Send.thispanel);
            table_send.setAttribute('align','center');

            let tr_from = $.create('tr',table_send);
            let td_from = $.create('td',tr_from);
            td_from.setAttribute('colspan','3');
            let table_from = $.create('table',td_from);
            table_from.setAttribute('align','center');
            tr_from = $.create('tr',table_from);
            let td_name =  $.create('td',tr_from);
            let label_name = $.create('label',td_name);
            $.create('span',label_name).innerHTML = "Nome: "
            Send.input_name = $.create('input',label_name);
            Send.input_name.setAttribute('type','text');
            Send.input_name.setAttribute('size','30');

            let td_class =  $.create('td',tr_from);
            let label_class = $.create('label',td_class);
            $.create('span',label_class).innerHTML = "Turma: "
            Send.input_class = $.create('input',label_class);
            Send.input_class.setAttribute('type','text');
            Send.input_class.setAttribute('size','8');

            let tr_send = $.create('tr',table_send);
            Send.td_logo = $.create('td',tr_send);
            let td_button = $.create('td',tr_send);
            let td_sendto = $.create('td',tr_send);
            // Send button creation.
            Send.button_send = $.create('button',td_button);
            Send.button_send.innerHTML = "Enviar para:";
            // Destination menu creation.
            Send.menu_sendto = $.create('select',td_sendto);
            let menu_option;
            for (let i=0;i<Send.addressList.length;i++) {
				menu_option = document.createElement('option');
				menu_option.text = Send.addressList[i][0];
				Send.menu_sendto.add(menu_option);
            }
            Send.menu_sendto.selectedIndex = 0;
            Send.setDestination();
            // Set event listeners to menu and button
            $.addEventListener(Send.menu_sendto,'change',Send.setDestination);
            $.addEventListener(Send.button_send,'click',Send.sendMessage);
        }
    },

    openTarget: function(target: string) {
        let popup = window.open(target, 'self');
        if ( popup ) {
            popup.focus();
        }
    },

    buildMessageBody: function(): string {
        return (
            "# Nome: "+(Send.input_name as any).value.trim()+"\n"+
            "# Turma: "+(Send.input_class as any).value.trim()+"\n"+
            "# Data: "+(new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString()+"\n\n"+
            (Send.linesArray as any).join('\n')
        );
    },

    sendWhatsAppMessage: function() {
        let target: string;
        // Use whatsapp protocol.
        target = `whatsapp://send?`;
        // Use WhatsApp API.
        target = `https://api.whatsapp.com/send?`;
        target += `phone=${encodeURIComponent(Send.destination)}&`;
        target += `text=${encodeURIComponent(Send.buildMessageBody())}`;
        Send.openTarget(target);
    },

    sendEmailMessage: function() {
        let escfunc;
        if (Send.isMobile) {
            escfunc = encodeURIComponent;
        }
        else {
            escfunc = escape;
        }
        let target = `mailto:${escfunc((Send.addressList as any)[(Send.menu_sendto as any).selectedIndex][0].substring(0,(Send.addressList as any)[(Send.menu_sendto as any).selectedIndex][0].indexOf(',')))} `;
        target += `${escfunc("<"+(Send.addressList as any)[(Send.menu_sendto as any).selectedIndex][1]+">")}?`;
        target += `subject=${escfunc("["+(Send.input_name as any).value.trim()+" - "+(Send.input_class as any).value.trim()+"] "+(new Date()).toLocaleDateString()+" "+(new Date()).toLocaleTimeString())}&`;
        target += `body=${escfunc(Send.buildMessageBody())}`
        Send.openTarget(target);
    },

    sendMessage: function(event: Event) {
        if (((Send.input_name as any).value.trim()!=="") && ((Send.input_class as any).value.trim()!=="")) {
            if (Send.isphone()) {
                Send.sendWhatsAppMessage();
            }
            else if (Send.isemail()) {
                Send.sendEmailMessage();
            }
        }
        else {
            alert(Send.alertMessage);
        }
    }
}