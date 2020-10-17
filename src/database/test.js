const Database = require('./db.js');
const saveOprphanage = require('./save-orphanage.js')
Database.then(async (db)=>{

    //inserir os dados na tabela
    await saveOprphanage(db, {
        lat: '-29.700906',
        lng: '-53.8554484',
        name: 'Lar dos meninos',
        about: 'Presta assistẽncia a crianças de 09 a 15 anos em situação de vulnerabilidade social',
        whatsapp: '55997159122',
        images: [

            'https://images.unsplash.com/photo-1594753154778-273013529793?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9',
            'https://images.unsplash.com/photo-1597385573201-7257c53f11cc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9'

        ].toString(),
        instructions: 'Venha conhecer lorem ipsum dolor sit amet',
        opening_hours: 'Horário de visitas das 8h até as 18h',
        open_on_weekends: '0'
        
        
    });
    //consultar os dados na tabela
    const selectedOrhpanages = await db.all("SELECT * FROM orphanages")
    console.log(selectedOrhpanages);
    
    //consultar somente um orfanato pelo id
    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "1"');
    console.log(orphanage);

    //deletar dado da tabela
    //console.log(await db.run('DELETE FROM orphanages WHERE id = "5"'))




})