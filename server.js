const app = require('./config/app');

require('./config/database')('mongodb://localhost/socialAggregator');

app.listen(app.get('port'), () => {
    console.log(`Server running on localhost:${app.get('port')}`);
});
