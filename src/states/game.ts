import * as Phaser from "phaser";
import PlayerEntity from "../entity/player";
import PlayerSystem from "../system/player";
import ItemsSystem from "../system/items";
import {PlayerSprite} from "../sprite/player";
import {ItemSprite} from "../sprite/item";
import ItemEntity from "../entity/item";

export default class GameState extends Phaser.State {
    private playerEntity: PlayerEntity;
    private itemEntities: ItemEntity[];
    private playerSystem: PlayerSystem;
    private itemsGroup: Phaser.Group;
    private melody: Phaser.Sound;
    private hahaha: Phaser.Sound;

    create() {
        let playerSprite = new PlayerSprite(this.game);
        this.add.existing(playerSprite);
        this.playerEntity = new PlayerEntity(playerSprite);

        this.itemsGroup = this.add.group();
        this.itemsGroup.enableBody = true;
        let itemsSystem = new ItemsSystem(this.game, this.itemsGroup, this.playerEntity);
        this.itemEntities = itemsSystem.generateEntities(20);

        let cursors = this.input.keyboard.createCursorKeys();
        this.playerSystem = new PlayerSystem(this.playerEntity, cursors);

        this.melody = this.game.add.audio("melody");
        this.melody.play();
    }

    update() {
        this.playerSystem.update();
        this.physics.arcade.collide(this.playerEntity.sprite, this.itemsGroup, (player, item) => this.collidePlayerWithSprite(item));

        // let firstItem = this.itemsGroup.getAt(0);
        // let sItem = this.itemsGroup.getAt(1);
        // (firstItem as PIXI.DisplayObject).alpha = 1;
        // (sItem as PIXI.DisplayObject).alpha = 1;

    }

    collidePlayerWithSprite(item: ItemSprite) {
        this.itemEntities[item.id].collided();
        item.alpha = 1;
        this.hahaha = this.game.add.audio("hahaha");
        this.hahaha.play();
    }
}