import Phaser from "phaser";
import { eras } from "../content";

export type JourneyEvent =
  | { type: "era"; id: string }
  | { type: "reward"; id: string }
  | { type: "status"; text: string };

type Door = {
  eraId: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export class GameScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Container;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private prompt!: Phaser.GameObjects.Text;
  private doors: Door[] = [];
  private event!: (event: JourneyEvent) => void;
  private worldW = 2200;
  private worldH = 1200;
  private collected = new Set<string>();

  constructor(event: (event: JourneyEvent) => void) {
    super("Journey");
    this.event = event;
  }

  create() {
    this.cameras.main.setBackgroundColor("#080a0f");
    this.cameras.main.setBounds(0, 0, this.worldW, this.worldH);
    this.physics.world.setBounds(0, 0, this.worldW, this.worldH);

    this.drawWorld();
    this.createDoors();
    this.createPlayer();

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys("W,A,S,D,E,ENTER") as Record<string, Phaser.Input.Keyboard.Key>;

    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);

    this.prompt = this.add.text(0, 0, "WASD / ARROWS • E to enter a room", {
      fontFamily: "monospace",
      fontSize: "16px",
      color: "#d7dee9",
      backgroundColor: "#090b10cc",
      padding: { x: 14, y: 9 }
    }).setScrollFactor(0).setDepth(100).setOrigin(0, 1);
    this.prompt.setPosition(28, this.scale.height - 24);

    this.scale.on("resize", () => this.prompt.setPosition(28, this.scale.height - 24));
  }

  update() {
    if (!this.player) return;
    const speed = 260;
    const body = this.player.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.keys.A.isDown) body.setVelocityX(-speed);
    if (this.cursors.right.isDown || this.keys.D.isDown) body.setVelocityX(speed);
    if (this.cursors.up.isDown || this.keys.W.isDown) body.setVelocityY(-speed);
    if (this.cursors.down.isDown || this.keys.S.isDown) body.setVelocityY(speed);
    body.velocity.normalize().scale(speed);

    const nearby = this.nearestDoor();
    if (nearby) {
      const era = eras.find((item) => item.id === nearby.eraId)!;
      this.prompt.setText(`E / ENTER  →  ${era.year} · ${era.title}`);
      if (Phaser.Input.Keyboard.JustDown(this.keys.E) || Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
        this.openDoor(nearby);
      }
    } else {
      this.prompt.setText("WASD / ARROWS • Walk to a door • E to enter • ESC to return");
    }
  }

  private drawWorld() {
    const g = this.add.graphics();
    g.fillStyle(0x0c1017);
    g.fillRect(0, 0, this.worldW, this.worldH);

    // A deliberately simple text-only map. The real pixel-art map can replace this layer later.
    for (let x = 0; x <= this.worldW; x += 64) {
      g.lineStyle(1, 0x141b25, 0.7);
      g.lineBetween(x, 0, x, this.worldH);
    }
    for (let y = 0; y <= this.worldH; y += 64) {
      g.lineStyle(1, 0x141b25, 0.7);
      g.lineBetween(0, y, this.worldW, y);
    }

    g.lineStyle(3, 0x263244, 1);
    g.strokeRect(70, 90, this.worldW - 140, this.worldH - 180);

    this.add.text(110, 118, "SAGAR.EXE // THE JOURNEY", {
      fontFamily: "monospace", fontSize: "30px", color: "#edf2f7", fontStyle: "bold"
    });
    this.add.text(112, 158, "A portfolio you can read normally — or walk through.", {
      fontFamily: "monospace", fontSize: "15px", color: "#7f8da3"
    });

    this.add.text(110, 1040, "THE ROOMS ARE MILESTONES, NOT CHECKPOINTS. ENTER ANY ONE. SKIP ANY ONE.", {
      fontFamily: "monospace", fontSize: "13px", color: "#556277"
    });
  }

  private createDoors() {
    const positions = [
      [260, 350], [740, 350], [1220, 350], [1700, 350], [1220, 790]
    ];
    this.doors = eras.map((era, i) => ({ eraId: era.id, x: positions[i][0], y: positions[i][1], width: 240, height: 250 }));

    for (const door of this.doors) {
      const era = eras.find((item) => item.id === door.eraId)!;
      const hue = door.eraId === "future" ? 0xb56cff : 0x4f8cff;
      const container = this.add.container(door.x, door.y);
      const body = this.add.rectangle(0, 0, door.width, door.height, 0x0f141d, 1).setStrokeStyle(2, hue);
      const top = this.add.rectangle(0, -82, 178, 64, 0x151c27, 1).setStrokeStyle(1, hue);
      const line = this.add.rectangle(0, 35, 154, 3, hue, 0.8);
      const label = this.add.text(0, -80, era.year, { fontFamily: "monospace", fontSize: "22px", color: "#eef3f8", fontStyle: "bold" }).setOrigin(0.5);
      const title = this.add.text(0, -24, era.title, { fontFamily: "monospace", fontSize: "18px", color: "#eef3f8", fontStyle: "bold", align: "center", wordWrap: { width: 190 } }).setOrigin(0.5);
      const desc = this.add.text(0, 72, era.short, { fontFamily: "monospace", fontSize: "12px", color: "#8290a4", align: "center", wordWrap: { width: 190 } }).setOrigin(0.5);
      const status = this.add.text(0, 105, "[ ENTER ]", { fontFamily: "monospace", fontSize: "12px", color: "#a9b7c9" }).setOrigin(0.5);
      container.add([body, top, line, label, title, desc, status]);
      container.setDepth(2);

      // Small reward marker.
      this.add.circle(door.x + 95, door.y - 96, 7, hue).setDepth(3);
    }
  }

  private createPlayer() {
    this.player = this.add.container(1100, 850);
    const shadow = this.add.ellipse(0, 15, 30, 10, 0x000000, 0.45);
    const body = this.add.rectangle(0, 0, 26, 32, 0xe7edf4).setStrokeStyle(2, 0x7890aa);
    const visor = this.add.rectangle(0, -5, 16, 7, 0x151b25);
    this.player.add([shadow, body, visor]);
    this.physics.add.existing(this.player);
    const physicsBody = this.player.body as Phaser.Physics.Arcade.Body;
    physicsBody.setCollideWorldBounds(true);
    physicsBody.setSize(24, 30);
    physicsBody.setOffset(-12, -15);
  }

  private nearestDoor() {
    let nearest: Door | undefined;
    let distance = 120;
    for (const door of this.doors) {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, door.x, door.y);
      if (d < distance) { distance = d; nearest = door; }
    }
    return nearest;
  }

  private openDoor(door: Door) {
    const firstTime = !this.collected.has(door.eraId);
    this.collected.add(door.eraId);
    this.event({ type: "era", id: door.eraId });
    if (firstTime) this.event({ type: "reward", id: door.eraId });
  }
}
