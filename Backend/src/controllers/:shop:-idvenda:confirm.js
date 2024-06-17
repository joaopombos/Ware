const Pedidos = require('../models/pedidos');
const TipoSoftwares = require('../models/tipossoftwares');
shopController.confirmOrder = async (req, res) => {
    const { idvenda } = req.params;
    try {
        const pedido = await Pedidos.findOne({
            where: { id: idvenda },
            include: [{
                model: TipoSoftwares,
                as: 'Softwares',
                required: true
            }]
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(pedido);
    } catch (error) {
        res.status(500).json({ error: 'Error confirming order' });
    }
};
module.exports = shopController;