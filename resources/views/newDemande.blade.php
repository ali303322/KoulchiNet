<div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        {{-- Email Header --}}
        {{-- <h2 class="text-2xl font-semibold text-blue-500 my-4">{{ $mailData['title'] }}</h2> --}}

        {{-- Email Body --}}
        <h5 class="text-gray-700 text-sm mb-6">Bonjour {{ $mailData['prestataireName'] }},</h5>

        <div class="mt-6 border-t border-gray-200 pt-4 text-left">
            <p>Vous avez une nouvelle demande de service de la part de {{ $mailData['clientName'] }} {{ $mailData['clientPrenom'] }}.
                Vous pouvez contacter le client directement via la platform </p>
        </div>

        <p>Cordialement,</p>
        <p>L'équipe de la plateforme.</p>
    </div>
</div>

