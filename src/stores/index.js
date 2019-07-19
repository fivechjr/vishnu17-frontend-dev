import Timer from '@/stores/timer-store'

export default class Store {
    constructor() {
        this.timer = new Timer(this)
    }
}
