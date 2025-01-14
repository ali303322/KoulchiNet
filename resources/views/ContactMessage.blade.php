<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        {{-- Email Header --}}
        {{-- <h2 class="text-2xl font-semibold text-blue-500 my-4">{{ $mailData['title'] }}</h2> --}}

        {{-- Email Body --}}
        <h5 class="text-gray-700 text-sm mb-6">Bonjour Admin,</h5>

        <div class="mt-6 border-t border-gray-200 pt-4 text-left">
            <p>il a une message de contact form de {{ $Data['NomComplet']}} </p>
            <p>email : {{ $Data['email']}} </p>
            <p>Sujet : {{ $Data['subjet']}} </p>
            <p>Message : {{ $Data['message']}} </p>
        </div>

        <p>Cordialement,</p>
        <p>L'équipe de la plateforme.</p>
    </div>
</div>
