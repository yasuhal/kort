Ext.define('Kort.model.Vote', {
    extend: 'Ext.data.Model',
    config: {
		idProperty: 'id',
		
        fields: [
			{ name: 'id', type: 'auto' },
			{ name: 'fix_id', type: 'int' },
			{ name: 'user_id', type: 'string' },
			{ name: 'valid', type: 'string' }
        ],
        
		proxy: {
			type: 'rest',
            url : './server/webservices/validation/vote',
            reader: {
                type: 'json'
            }
		}
    }
});