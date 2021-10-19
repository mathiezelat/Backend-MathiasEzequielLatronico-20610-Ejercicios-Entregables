const fs = require('fs');

const getMessages = async () => {
    if( !fs.existsSync( 'messages.json') ) return [];

    const contenido = await fs.promises.readFile(
        'messages.json',
        'utf-8'
    );

    if ( !contenido ) return [];

    const messages = JSON.parse( contenido );

    return messages;
};

const saveMessages = async message => {

        const messages = await getMessages();
        
        messages.push( message );
        
        await fs.promises.writeFile( 
            'messages.json',
            JSON.stringify( messages, null, 2 )
        );

};

module.exports = {
    getMessages,
    saveMessages
};

