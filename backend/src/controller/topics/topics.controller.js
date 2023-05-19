const { sequelize } = require("../../connection");
const { TopicsModel } = require("../../model/topics.model");
const TopicsService = require("../../service/topics.service");

const listarTodos = async function (req, res) {
    console.log("CAYO AQUI");

    try {
        const topics = await TopicsService.listarTodos();

        if (topics) {
            // en users[0] se encuentra el listado de lo que se recupera desde el sql
            res.json({
                success: true,
                topicos: topics
            });

        } else {
            res.json({
                success: true,
                topicos: []
            });

        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });

    }

};

///cuando se trata de listar es mejor usar SQL puro por cuestion de tiempo
const listar = async function (req, res) {
    console.log("CAYO AQUI");

    try {
        const topics = await TopicsService.listarTodos(req.query.filtro || '');

        if (topics) {
            // en users[0] se encuentra el listado de lo que se recupera desde el sql
            res.json({
                success: true,
                topicos: topics[0]//ERROR AQUI
            });

        } else {
            res.json({
                success: true,
                topicos: []
            });

        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });

    }

};

const consultarPorCodigo = async function (req, res) {
    console.log("consultar 1 topico por codigo");

    try {
        const topicsModelResult = await TopicsService.consultarPorCodigo(req.params.id);

        if (topicsModelResult) {
            res.json({
                success: true,
                topicos: topicsModelResult
            });

        } else {
            res.json({
                success: true,
                topicos: null
            });

        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });

    }

};

const actualizar = async function (req, res) {
    console.log("actualizar topicos");

    let topicoRetorno = null; //guarda el topico que se va incluir o editar;

    try {
        let topicoRetorno = await TopicsService.actualizar(
            req.body.id,
            req.body.create_date,
            req.body.name,
            req.body.topic_id,
            req.body.order,
            req.body.priority,
            req.body.color,
            req.body.owner_user_id
        );

        res.json({
            success: true,
            topics: topicoRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("eliminar topicos");

    try {
        const topicoRetorno = await TopicsService.eliminar(req.params.id);
        res.json({
            success: topicoRetorno,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });


    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar, listarTodos
};
