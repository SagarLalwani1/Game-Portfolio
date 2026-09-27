import Phaser from "phaser";

export type OpenStory = (id: string) => void;

type Interactable = {
  id: string;
  x: number;
  y: number;
  label: string;
  color: number;
};

export class GameScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private player!: Phaser.GameObjects.Rectangle;
  private prompt!: Phaser.GameObjects.Text;
  private interactables: Interactable[] = [];
  private openStory!: OpenStory;

  constructor(openStory: OpenStory) {
    super("MGITLab");
    this.openStory = openStory;
  }

  create() {
    this.cameras.main.setBackgroundColor("#0a0d12");

    this.drawRoom();

    this.player = this.add.rectangle(480, 390, 26, 26, 0xe8edf2);
    this.player.setStrokeStyle(2, 0x8aa0b8);

    this.interactables = [
      { id: "firstC", x: 180, y: 175, label: "FIRST C PROGRAM", color: 0x4f8cff },
      { id: "mike", x: 480, y: 175, label: "MIKE / WATSON", color: 0x8f6cff },
      { id: "smartVehicle", x: 780, y: 175, label: "SMART VEHICLE", color: 0x3fbf8f },
      { id: "bb8", x: 480, y: 330, label: "BB-8", color: 0xf09a4a },
    ];

    for (const item of this.interactables) {
      this.add.rectangle(item.x, item.y, 150, 90, 0x111822, 1)
        .setStrokeStyle(2, item.color);
      this.add.circle(item.x, item.y - 8, 13, item.color);
      this.add.text(item.x, item.y + 30, item.label, {
        fontFamily: "monospace",
        fontSize: "11px",
        color: "#dce5ef",
        align: "center",
        wordWrap: { width: 130 },
      }).setOrigin(0.5);
    }

    this.prompt = this.add.text(480, 500, "WASD / ARROWS to move  •  E / ENTER to inspect", {
      fontFamily: "monospace",
      fontSize: "13px",
      color: "#91a1b5",
    }).setOrigin(0.5);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.keys = this.input.keyboard!.addKeys("W,A,S,D,E,ENTER") as Record<string, Phaser.Input.Keyboard.Key>;
  }

  update() {
    const speed = 2.8;
    let dx = 0;
    let dy = 0;

    if (this.cursors.left.isDown || this.keys.A.isDown) dx -= speed;
    if (this.cursors.right.isDown || this.keys.D.isDown) dx += speed;
    if (this.cursors.up.isDown || this.keys.W.isDown) dy -= speed;
    if (this.cursors.down.isDown || this.keys.S.isDown) dy += speed;

    this.player.x = Phaser.Math.Clamp(this.player.x + dx, 60, 900);
    this.player.y = Phaser.Math.Clamp(this.player.y + dy, 90, 430);

    const nearby = this.interactables.find(
      (item) => Phaser.Math.Distance.Between(this.player.x, this.player.y, item.x, item.y) < 85
    );

    if (nearby) {
      this.prompt.setText(`E / ENTER  →  ${nearby.label}`);
      if (Phaser.Input.Keyboard.JustDown(this.keys.E) || Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
        this.openStory(nearby.id);
      }
    } else {
      this.prompt.setText("WASD / ARROWS to move  •  E / ENTER to inspect");
    }
  }

  private drawRoom() {
    this.add.rectangle(480, 270, 900, 430, 0x10161f).setStrokeStyle(2, 0x334155);

    // Floor grid
    for (let x = 40; x < 920; x += 40) {
      this.add.line(0, 0, x, 70, x, 470, 0x17212d, 0.65).setOrigin(0);
    }
    for (let y = 70; y <= 470; y += 40) {
      this.add.line(0, 0, 40, y, 920, y, 0x17212d, 0.65).setOrigin(0);
    }

    this.add.text(50, 28, "MGIT LAB // 2019–2020", {
      fontFamily: "monospace",
      fontSize: "18px",
      color: "#e8edf2",
      fontStyle: "bold",
    });

    this.add.text(50, 52, "THE ROOM WHERE BUILDING MACHINES TURNED INTO BUILDING SOFTWARE", {
      fontFamily: "monospace",
      fontSize: "10px",
      color: "#718096",
    });

    this.add.text(850, 28, "V0.1", {
      fontFamily: "monospace",
      fontSize: "12px",
      color: "#4f8cff",
    });
  }
}