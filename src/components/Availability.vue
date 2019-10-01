<!--
  Lime project
  File: Availability.vue
  (c) 2019 delphinpro <delphinpro@gmail.com>
  licensed under the MIT license
-->

<script>
import {
    mapActions,
    mapGetters,
}                          from 'vuex';
import LoadingIndicator    from '@/components/LoadingIndicator';
import DropdownList        from '@/components/DropdownList';
import { telephoneAsLink } from '@/lib';


export default {
    name: 'Availability',

    components: {
        LoadingIndicator,
        DropdownList,
    },

    props: {
        sku: Object,
    },

    data: () => ({
        isListView: true,

        cities     : [],
        citiesReady: false,
        cityIndex  : null,

        shops     : [],
        shopsReady: false,
    }),

    computed: {
        ...mapGetters([
            'isMobileDevice',
        ]),

        selectedCity() {
            if (this.cityIndex in this.cities) return this.cities[this.cityIndex];
            return null;
        },

        shopList() {
            return this.shops.map(shop => {
                if (!this.sku || !this.sku.rests || !Array.isArray(this.sku.rests)) return shop;
                let s = this.sku.rests.find(item => item.shop === shop.id);
                return {
                    ...shop,
                    sizes: s ? s.sizes : [],
                };
            });
        },

        optionsForCities() {
            return this.cities.map(item => {
                return {
                    title: item.name,
                    value: item.id,
                };
            });
        },
    },

    async mounted() {
        this.citiesReady = false;
        this.cities      = await this.getCityList({});
        if (this.cities.length) this.cityIndex = 0;
        this.citiesReady = true;

        if (this.selectedCity) {
            this.updateShopList(this.selectedCity.id);
        } else {
            this.shopsReady = true;
        }
    },

    methods: {
        ...mapActions([
            'getCityList',
            'getShopList',
        ]),

        pickCity(cityIndex) {
            this.cityIndex = cityIndex;
            this.updateShopList(this.selectedCity.id);
        },

        async updateShopList(cityId) {
            this.shopsReady = false;
            let response    = await this.getShopList({ cityId });
            this.shops      = response.items;
            this.shopsReady = true;
        },

        phoneLink(phone) {
            return telephoneAsLink(phone);
        },
    },
};
</script>

<template>
    <div class="Availability" :class="{isMobile:isMobileDevice}" v-if="citiesReady">
        <h1>Наличие в магазинах</h1>
        <p><strong>Этот товар вы сможете приобрести в магазинах LIMÉ:</strong></p>
        <div class="Availability__citySelector" v-if="cities.length">
            <p><strong>Выберите город</strong></p>
            <DropdownList
                placeholder="Город не выбран"
                :selected="cityIndex"
                :options="optionsForCities"
                @change="pickCity"
            />
        </div>

        <template v-if="shopsReady">
            <ul class="Availability__switchLinks switch-links">
                <li class="switch-links__item" :class="{active:isListView}" @click="isListView=true">Список</li>
                <li class="switch-links__delimiter">|</li>
                <li class="switch-links__item" :class="{active:!isListView}" @click="isListView=false">Карта</li>
            </ul>

            <div class="Availability__shops" v-if="shopsReady">
                <div class="shop-list" v-if="isListView">
                    <div class="shop-list__item" v-for="item in shopList">
                        <div class="shop-list__row"><strong>{{item.name}}</strong></div>
                        <div class="shop-list__row">
                            <a :href="phoneLink(item.phone)">{{item.phone}}</a>
                        </div>
                        <div class="shop-list__row">{{item.address}}</div>
                        <div class="shop-list__row" v-if="item.sizes&&item.sizes.length">{{item.sizes.join(', ')}}</div>
                    </div>
                </div>
                <div v-else>
                    <h3 style="color:red">Here will be a map. Later...</h3>
                </div>
            </div>

            <div class="Availability__note">
                Информация носит справочный характер.
                Мы рекомендуем Вам позвонить в магазин, чтобы проверить наличие и
                зарезервировать модель.
            </div>
        </template>
        <LoadingIndicator class="Availability__indicator" v-else/>
    </div>
    <LoadingIndicator v-else/>
</template>

<style lang="scss" src="../styles/components/Availability.scss"></style>
