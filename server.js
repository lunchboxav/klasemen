var Hapi = require('hapi');
var r = require('rethinkdb');
var Hoek = require('hoek');
var Path = require('path');

var server = new Hapi.Server();

server.connection({
    port: 9386
});

var connection = null;

r.connect({
    host: 'localhost',
    port: 28015
}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates'
    });
});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/input',
        handler: function(request, reply) {
            reply.file('./public/input.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/leaderboard',
        handler: function(request, reply) {
            reply.file('./public/leaderboard.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/public/{file*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
});

var getIndexConfig = function(request, reply) {
    //r.table('klasemen').changes().run(connection, updateCallback);
    r.table('klasemen').orderBy({
        index: 'swingAndDamage'
    }).run(connection, function(err, cursor) {
        if (err) throw err;
        cursor.toArray(function(err, result) {
            if (err) throw err;
            //console.log(JSON.stringify(result, null, 2));
            reply(result);
        });
    });
};

var getDataConfig = function() {
    return new Promise(function(resolve, reject) {
        r.table('klasemen').orderBy({
            index: 'swingAndDamage'
        }).run(connection, function(err, cursor) {
            if (err) throw err;
            cursor.toArray(function(err, result) {
                if (err) throw err;
                resolve(result);
            });
        });
    });
};

var helloPostHandler = function(request, reply) {
    console.log("Received POST from " + request.payload.name + " " +
        request.payload.swing);
    r.db('test').table('klasemen').insert({
        name: request.payload.name,
        address: request.payload.address,
        phone: request.payload.phone,
        swing: Number(request.payload.swing),
        damage: Number(request.payload.damage)
    }).run(connection, function(err, result) {
        if (err) throw err;
    });
    reply.view('dataConfirm', {
        name: request.payload.name,
        swing: request.payload.swing,
        damage: request.payload.damage
    });
}

var postDataConfig = {
    handler: helloPostHandler
};

server.route([{
    method: 'GET',
    path: '/',
    handler: getIndexConfig,
}, {
    method: 'POST',
    path: '/postData',
    config: postDataConfig
}, {
    method: 'GET',
    path: '/data',
    handler: function(request, reply) {
        getDataConfig().then(function(response) {
            reply.view('dataView', {
                title: "Data Peserta",
                jsonData: response
            });
        });
    }
}]);

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server is running at: ${server.info.uri}`);
});
