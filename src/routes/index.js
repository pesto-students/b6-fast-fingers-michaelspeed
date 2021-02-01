import {compose, mount, route, withView} from "navi";
import React from 'react';
import HomePage from "../pages/home";
import MainLayout from "../layouts/MainLayout";
import {View} from "react-navi";
import Game from "../pages/game";

export const routes = compose(
    withView((request, context, args) => <MainLayout>
        <View/>
    </MainLayout>),
    mount({
        '/': route({
            title: 'Home',
            view: <HomePage/>
        }),
        '/game/:id/:key': route(async request => {
            let id = request.params.id;
            let key = request.params.key;
            return {
                title: 'Game',
                view: <Game id={id} difficulty={key}/>
            }
        })
    })
)
