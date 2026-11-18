document.getElementById('btnLer').addEventListener('click', async () => {
    const inputFoto = document.getElementById('fotoFicha');
    const divResultado = document.getElementById('resultado');

    if (inputFoto.files.length === 0) {
        alert('Por favor, selecciona ou tira uma foto da ficha primeiro!');
        return;
    }

    const ficheiro = inputFoto.files[0];
    const formData = new FormData();
    formData.append('imagem', ficheiro);

    divResultado.innerText = 'A processar a ficha com IA... Por favor, aguarda.';

    try {
        const resposta = await fetch('/api/ler-ficha', {
            method: 'POST',
            body: formData
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            divResultado.innerText = 'Resultado:\n' + JSON.stringify(dados, null, 2);
        } else {
            divResultado.innerText = 'Erro do servidor: ' + (dados.erro || 'Desconhecido');
        }
    } catch (erro) {
        console.error(erro);
        divResultado.innerText = 'Erro de ligação ao servidor. Tenta novamente.';
    }
});
