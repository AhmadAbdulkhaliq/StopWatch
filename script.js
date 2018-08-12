class Component
{
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer
{
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen () {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}


class StopWatch extends Component
{
    constructor() {
        super();

        this.seconds=0;
        this.minutes=0;
        this.hours=0;
        this.interval;
        this.mSecond=0;
        }


        start(){
            this.interval=setInterval(()=>{
                this.mSecond++;
               if(this.mSecond>=10){
                this.mSecond=0;
                this.seconds++;
                if (this.seconds >= 60) {
                    this.seconds = 0;
                    this.minutes++;
                    if (this.minutes >= 60) {
                        this.minutes = 0;
                        this.hours++;
                    }
                }
                } 
            this.notify();
            },100)
        }
       
  

    render() {
        return $('<div>')
            .append($('<h1>')
            .html(`${this.hours>9?this.hours:'0'+this.hours} : ${this.minutes>9?this.minutes:'0'+this.minutes} : ${this.seconds>9? this.seconds:'0'+this.seconds} : ${this.mSecond>9?this.mSecond:'0'+this.mSecond}`)
            ).append([
                $('<button>').addClass('start ').html('Start').on('click', () => {
                    this.start();
                    this.notify();
                }),
                $('<button>').addClass('pause ').html('Pause').on('click', () => {
                    clearInterval(this.interval)
                }),
                $('<button>').addClass('reset').html('Reset').on('click', () => {
                    clearInterval(this.interval)
                    this.mSecond=0;
                    this.seconds=0;
                    this.minutes=0;
                    this.hours=0;
                    
                    this.notify();
                })
            ])[0];    
               
        }
        
}
