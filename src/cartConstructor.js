export default class cartConstructor {
    constructor({id}) {
        if (!id) throw new Error ('falta el ID')
        this.id = id
        this.array = []

    }
    
}
