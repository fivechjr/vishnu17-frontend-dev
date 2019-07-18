import TimerStore from '@/stores/TimerStore'

export default class Store {
    constructor() {
        this.timerStore = new TimerStore(this)
    }
}
