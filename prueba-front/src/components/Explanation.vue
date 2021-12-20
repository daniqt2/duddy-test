<template>
    <div class="text-sm-center">
        <h4 class="my-4">
            Satisfacción general de los clientes:
            <span class="text-info">{{ format(general) }}/10</span>
        </h4>
        <div>
            <div class="p-4 shadow-sm my-4 text-info bg-light text-md-left">
                <p>
                    Vamos a considerar la satisfacción
                    <b>individual</b>
                    de cada cliente entre
                    <b>0-1</b>
                    donde
                    <b>1 = muy satisfecho</b>
                    y
                    <b>0 = nada satisfecho</b>
                </p>
                <p>
                    Las Satisfacción grupal/general se considera entre
                    <b>0-10</b>
                    (10 siendo la más alta) y se calcula con el promedio de la satisfacción de los clientes
                    involucrados.
                </p>
                <li class="ml-md-2">
                    <b>Satisfacción grupal de cada entrenador</b>
                    : Promedio de la satisfacción de los clientes asignados a ese entrenador.
                </li>
                <li class="ml-md-2">
                    <b>Satisfacción general</b>
                    : Promedio de satisfacción de TODOS los clientes (incluso los no asignados, si fuera el caso).
                </li>
                <div class="my-4">{{ textOne }}</div>
            </div>
            <p>
                <span class="text-danger">1</span>
                - ( (
                <span class="text-warning">A</span>
                -
                <span class="text-info">B</span>
                ) *
                <span class="text-success">C</span>
                *
                <span class="text-danger">.02</span>
                )
            </p>
            <div class="text-left ml-md-4">
                <ul class="decoration-none">
                    <li>
                        <span class="text-danger">1</span>
                        : Lo que tomaremos como el valor mas alto de satisfacción. El .02 es simplemente un peso para
                        las unidades.
                    </li>
                    <li>
                        <span class="text-warning">A</span>
                        : Valoración más alta que puede tener un entrenador (la mejor = 5).
                    </li>
                    <li>
                        <span class="text-info">B</span>
                        : Valoración del cliente asignado.
                    </li>
                    <li>
                        <span class="text-success">C</span>
                        : Importancia que da el cliente a tener un entrenador con alto nivel.
                    </li>
                </ul>
            </div>
        </div>
        <div class="text-info text-center text-md-left my-4">
            {{ textThree }}
        </div>
        <div class="border-top py-4">
            <h4>Una forma mas visual de verlo</h4>
            <div class="p-4 shadow-sm my-4 text-info bg-light">
                {{ textTwo }}
            </div>
            <div class="text-left text-sm-center ml-5">
                <p class="mb-0">
                    <b>Index</b>
                    : Niveles de importancia que da el cliente a tener un entrenador bueno o no.
                </p>
                <p class="mt-0">
                    <b>Columnas</b>
                    : Valoraciónes que puede tener un entrenador.
                </p>
            </div>
            <div class="d-flex">
                <b-table small hover :items="chartData" :fields="['index', '0', '1', '2', '3', '4', '5']">
                    <template #cell(index)="data" class="text-primary">
                        {{ data.index }}
                    </template>
                </b-table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ExplanationPaage',
    props: {
        chartData: {
            type: Array,
            default: null,
        },
        general: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            textOne: `Para calcular la satisfacción de cada cliente vamos a usar como peso el valor de la importancia que da el cliente a tener un entrenador con buen nivel o no.
            Entre más alta sea la importancia más se va a "penalizar" que el entrenador tenga buen nivel o no. Para ello se usa la siguiente formula:`,
            textTwo: `La siguiente tabla muestra todas las combinaciones posibles de entrenador-cliente (asumiendo números enteros) y la satisfacción de esta. 
            Se puede ver fácilmente como el peso es mayor entre más sube la importancia del cliente, lo que hace que la satisfacción baje al tener entrenadores con niveles menores.`,
            textThree: `Para asegurar que siempre se obtenga la satisfacción más alta posible, los clientes son asignados en orden especifico. Esto se hace ordenando a los clientes de  mayor importancia a menor importancia 
            y empezando las asignaciones con los entrenadores con rango más alto. De esta forma nos aseguramos que los clientes con mayor importancia queden asignados con los entrenadores 
            de mayor rango posible y por ende nos den más "puntos de satisfacción".`,
        };
    },
    methods: {
        format(val) {
            return val.toFixed(2);
        },
    },
};
</script>
