<x-mail::message>
# Hi {{$name}},

<p>You got an answer for your survey</p>
<small>click on the button below to view the latest answer to your survey</small>

<x-mail::button :url="$url" color="success">
Verify
</x-mail::button>

Thanks,<br>
Tobi Olanitori, <br>
{{ config('app.name') }}
</x-mail::message>
