@component('mail::message')
# Mã xác thực của bạn

Mã OTP của bạn là **{{ $otp }}**, có hiệu lực trong 5 phút.

Nếu bạn không yêu cầu mã này, hãy bỏ qua email.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
