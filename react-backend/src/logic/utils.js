

export default class Utils {

    constructor(db) {
        this.db = db;
    }
    
    to = (/** @type {any} */ promise) => {
        return promise
            .then((/** @type {any} */ data) => [null, data])
            .catch((/** @type {any} */ err) => [err]);
    }

    next_user_id = async() => {
        let id = await this.db.GET('nextId');
        if (!id || id == undefined) id = -1;
        return id + 1;
    }

    user_exist = async(username) => {
        let userExist = await this.db.EXISTS(`users:${username}:info`);
        if (!userExist) return false;
        return true;
    }

    fetch_password = async(user) => {
        let acc = await this.user_exist(user);
        if (!acc) return 'Could not find account in database';

        let passwd = await this.db.HGET(`users:${user}.info`, 'password');
        return passwd;
    }

    new_register = async(username, passwd) => {
        let acc = await this.user_exist(user);
        if (acc) return 'Seems like this account already exists. Try logging in instead.';

        //await this.db.INCR
        await this.db.HSET(`users:${username}.info`, { id: this.next_user_id(), password: passwd, isAdmin: false });
        return 'Successfully registered!';
    }
}