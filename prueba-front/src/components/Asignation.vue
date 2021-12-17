<template>
  <div>
      <div>
        <b-tabs content-class="mt-3">
            <b-tab title="Entrenadores" :active="selected === TABS[0]" @click="selected=TABS[0]"><h2>Entrenadores</h2></b-tab>
            <b-tab title="Valoracion de Conjunto" :active="selected === TABS[1]" @click="selected=TABS[1]"><h2>Satisfacción del conjunto</h2></b-tab>
        </b-tabs>
      </div>
       <p v-if="notAsignedClients.length">Clients missing assigment: {{notAsignedClients}}</p>
      <div class="row row-cols-3 mt-5 justify-content-center" >
          <div v-for="(trainer,i) in sortedTrainers" :key="trainer.name" class="col-auto d-flex align-items-stretch">
              <b-card
              v-if="trainer.clients"
                    :title="trainer.name"
                    :header="`Entrenador ${i+1}`"
                    :footer="`${trainer.clients.length} clientes asignados`"
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2 text-left"
                >
                    <div v-if="selected == TABS[0]">
                        <b-card-text class="ml-4">
                        <p v-for="client in trainer.clients" :key="client.name">{{client.name}}</p>
                        </b-card-text>
                    </div>
                    <div v-else class="text-center">
                        <p class="mb-0">Satisfaccion de grupo</p>
                        <p><b>{{satisfaccion[i]*10}}</b>/10</p>
                    </div>
                </b-card>
          </div>
      </div>
      <div v-if="selected == TABS[1]">
         <h4 class="my-4"> Satisfaccion general: {{generalSatisfaction}}/10</h4>
         <div>
             <p>Para este caso vamos a considerar que la satisfacción <b>individual</b> de un cliente esta entre <b>0-1</b> siendo <b>0 nada satisfecho</b> y <b>1 muy satisfecho</b></p>
             <p>La satisfacción individual de cada cliente se calcula en base a la importancia que le den al tener un entrenador con buen nivel o no.</p>
             <p>Entre mas importancia le den, mas va a tener efecto negativo el que no sean asignados con niveles buenos.</p>
             <p>Para esto, la importancia del cliente funciona como peso y se puede ver en la siguiente fórmula:</p>
             <p>([A]- ( ([B]-[C] * D)  )) /[A] </p>
             <div class="text-left">
                 <ul class="decoration-none">
                 <li>A: Maximo valor de satisfacción: En este caso lo tomaremos como '50' (10 niveles de importacia * 5 rangos).</li>
                 <li>B: Valoración mas alta que puede tener un entrenador (la mejor = 5).</li>
                 <li>C: Valoración del entrenador asignado.</li>
                 <li>D: Importancia del cliente hacia tener un entrenador con buen nivel o no.</li>
             </ul>
             </div>
         </div>
         <h4>Una forma mas visual de verlo</h4>
         <p>Mientras mas sube la importancia del cliente, mas baja es su satisfacción al ser asignado con un entrenador de bajo nivel. </p>
         <p><b>INDEX</b>: Esta columna reporesenta el nivel de importancia que da el cliente.</p>
         <p><b>Columnas</b>: Representan los diferentes niveles que puede tomar un entrenador.</p>
            <div class="d-flex">
                <b-table small hover :items="chartData" :fields="['index','0','1','2','3','4','5']">
                    <template #cell(index)="data" class="text-primary">
                        {{ data.index }}
                    </template>
                </b-table>
            </div>
       </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
const TABS = ['entrenadores','valoracion']
export default {
    computed:{
        ...mapState(['trainers','clients']),
        sortedTrainers(){
            return  this.sort('rank',this.trainers);
        },
        sortedClients(){
            return this.sort('importance',this.clients)
        },
        satisfaccion(){
            return this.sortedTrainers.map(trainer => {
                const sum = trainer.clients.reduce( ( summ, { satisfactation } ) => summ + satisfactation , 0)
                return (sum/trainer.clients.length).toFixed(2);
            }) || []
        },
        satisfactationSum(){
           if (this.satisfaccion)return this.satisfaccion.reduce(this.add,0).toFixed(2)
           else return null
        },
        chartData(){
            const data = {}
            for(var row = 0; row <= this.maxClientRank; row++) {
                data[row] = []
                data[row]['index'] = row
                 for(var col = 0; col <= this.maxTrainerRank; col++) {
                     
                     (row,col)
                        data[row][col] = this.calc(row,col)
                    }
            }
            return Object.values(data)
        },
        generalSatisfaction(){
            return ((this.allClientSatis/this.clients.length)*10).toFixed(2);
        },
        notAsignedClients(){
            return this.notAsigned.map(c => c.name).join(',')
        },
        allClientSatis(){
            return this.clients.map(c=>c.satisfactation).reduce(this.add,0).toFixed(2)
        }
    },
    data(){
        return {
            clonedClients : [],
            selected: TABS[0],
            TABS,
            maxSatisValue: 50,
            maxTrainerRank:5,
            maxClientRank:10,
            notAsigned: []
        }
    },
    watch:{
        sortedTrainers(){
            this.asign();
        },        
        sortedClients (){
            this.asign();
        },        
    },
    created(){
        this.asign()
    },
    methods:{
        sort(key,list){
            const copy = [...list]
            return copy.sort(function (a, b) {
            return a[key] - b[key];
            }).reverse();
        },
        asign(){
            // let count = 0
            let arrClone = [...this.sortedClients]
            this.sortedTrainers.forEach(trainer => {
                
                (trainer)
                const num = trainer.slots;
                const clients =  arrClone.slice(0,num)
                arrClone.splice(0,num)
                clients.forEach(c => c.satisfactation = this.calc(c.importance,trainer.rank))
                this.$set(trainer,'clients',clients)
            })
            this.notAsigned = [...arrClone];
        },
        calc(clientImp,rank){
            const satis = (this.maxSatisValue - ((this.maxTrainerRank-rank)*clientImp))
            return satis/this.maxSatisValue
        },
        add(accumulator, n) {
        return accumulator + parseFloat(n);
        }
    }
}
</script>