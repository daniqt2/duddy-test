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
                    La
                    <b>satisfacción grupal</b>
                    de cada entrenador sera entre
                    <b>0-10</b>
                    (10 es la mas alta) y se calcula con el promedio de sus clientes.
                </p>
                <p>
                    La
                    <b>satisfacción general</b>
                    sera entre
                    <b>0-10</b>
                    (10 es la mas alta) y es el promedio de satisfacción de todos los clientes.
                </p>
                {{ textOne }}
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
                <span class="text-danger">.01</span>
                )
            </p>
            <div class="text-left ml-4">
                <ul class="decoration-none">
                    <li>
                        <span class="text-danger">1</span>
                        : Lo que tomaremos como el valor mas alto de satisfacción. El .01 es el peso para las unidades.
                    </li>
                    <li>
                        <span class="text-warning">A</span>
                        : Valoración mas alta que puede tener un entrenador (la mejor = 5).
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
        <div class="border-top py-4">
            <h4>Una forma mas visual de verlo</h4>
            <div class="p-4 shadow-sm my-4 text-info bg-light">
                {{ textTwo }}
            </div>
            <div class="text-left text-sm-center ml-5">
                <p class="mb-0">
                    <b>Index</b>
                    : Representa el nivel de importancia que da el cliente.
                </p>
                <p class="mt-0">
                    <b>Columnas</b>
                    : Representan los diferentes niveles que puede tomar un entrenador.
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
            textOne: `Para calcular la satisfacción de cada cliente vamos a usar como peso la importancia que da a tener un entrenador con buen nivel o no.
            Entre mas alta sea la importancia mas se va a "penalizar" que el entrenador tenga buen nivel o no. Para ello se usa la siguiente formula:`,
            textTwo: `La siguiente tabla muestra todas las combinaciones posibles de entrenador-cliente (asumiendo numeros enteros) y la satisfacción de esta. 
            Se puede ver facilmente como entre mas sube la importancia del cliente, el peso es mayor y por ende la satisfacción baja al tener entrenadores con menor
            valoración`,
        };
    },
    methods: {
        format(val) {
            return val.toFixed(2);
        },
    },
};
</script>

<style></style>
