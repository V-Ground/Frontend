import { Report } from 'notiflix/build/notiflix-report-aio';

export default function SuccessAlert(message) {
    const customAlert = (message) => {
        Report.success(
            '',
            String(message),
            '확인',
            {
                width: '328px',
                position: 'center-top',
                borderRadius: '15px',
                fontFamily: 'Spoqa Han Sans Neo',
                messageFontSize: '18px',
                buttonFontSize: '16px',
                success: {
                    buttonBackground: '#3478FF',
                    backOverlayColor: 'rgba(51, 51, 51, 0.6)'
                },
                info: {
                    buttonBackground: '#3478FF',
                    backOverlayColor: 'rgba(51, 51, 51, 0.6)'
                }
            }
        )
    }

    return customAlert(message);
}