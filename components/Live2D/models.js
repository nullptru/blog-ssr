export const modelHaru = {
  config: {
    scaleX: -0.2,
    scaleY: 0,
    scaleZ: 0.63,

    translateX: 0,
    translateY: -0.3,
  },
  model: {
    type: 'Live2D Model Setting',
    name: 'haru',
    model: 'static/haru/haru_02.moc',
    textures:
    [
      'static/haru/haru_02.1024/texture_00.png',
      'static/haru/haru_02.1024/texture_01.png',
      'static/haru/haru_02.1024/texture_02.png',
    ],
    physics: 'static/haru/haru.physics.json',
    pose: 'static/haru/haru.pose.json',
    expressions:
    [
      { name: 'f01', file: 'static/haru/expressions/f01.exp.json' },
      { name: 'f02', file: 'static/haru/expressions/f02.exp.json' },
      { name: 'f03', file: 'static/haru/expressions/f03.exp.json' },
      { name: 'f04', file: 'static/haru/expressions/f04.exp.json' },
      { name: 'f05', file: 'static/haru/expressions/f05.exp.json' },
      { name: 'f06', file: 'static/haru/expressions/f06.exp.json' },
      { name: 'f07', file: 'static/haru/expressions/f07.exp.json' },
      { name: 'f08', file: 'static/haru/expressions/f08.exp.json' },
    ],
    layout:
    {
      center_x: 0,
      y: 1.2,
      width: 2.9,
    },
    hit_areas:
    [
      { name: 'head', id: 'D_REF.HEAD' },
      { name: 'body', id: 'D_REF.BODY' },
    ],
    motions:
    {
      idle:
      [
        { file: 'static/haru/motions/idle_00.mtn', fade_in: 2000, fade_out: 2000 },
        { file: 'static/haru/motions/idle_01.mtn', fade_in: 2000, fade_out: 2000 },
        { file: 'static/haru/motions/idle_02.mtn', fade_in: 2000, fade_out: 2000 },
      ],
      tap_body:
      [
        { file: 'static/haru/motions/tapBody_00.mtn', sound: 'static/haru/sounds/tapBody_00.mp3' },
        { file: 'static/haru/motions/tapBody_01.mtn', sound: 'static/haru/sounds/tapBody_01.mp3' },
        { file: 'static/haru/motions/tapBody_02.mtn', sound: 'static/haru/sounds/tapBody_02.mp3' },
        { file: 'static/haru/motions/tapBody_04.mtn' },
        { file: 'static/haru/motions/tapBody_05.mtn' },
        { file: 'static/haru/motions/tapBody_05.mtn' },
        { file: 'static/haru/motions/tapBody_06.mtn' },
        { file: 'static/haru/motions/tapBody_07.mtn' },
        { file: 'static/haru/motions/tapBody_08.mtn' },
        { file: 'static/haru/motions/tapBody_09.mtn' },
      ],
      pinch_in:
      [
        { file: 'static/haru/motions/pinchIn_00.mtn', sound: 'static/haru/sounds/pinchIn_00.mp3' },
      ],
      pinch_out:
      [
        { file: 'static/haru/motions/pinchOut_00.mtn', sound: 'static/haru/sounds/pinchOut_00.mp3' },
      ],
      shake:
      [
        { file: 'static/haru/motions/shake_00.mtn', sound: 'static/haru/sounds/shake_00.mp3', fade_in: 500 },
      ],
      flick_head:
      [
        { file: 'static/haru/motions/flickHead_00.mtn', sound: 'static/haru/sounds/flickHead_00.mp3' },
      ],
    },
  },
};

export const modelMorakumo = {
  config: {
    scaleX: 0,
    scaleY: 0,
    scaleZ: 0.7,

    translateX: 0,
    translateY: 0.3,
  },
  model: {
    version: 'Sample 1.0.0',
    model: 'static/murakumo/murakumo.moc',
    textures: [
      'static/murakumo/murakumo_2048/texture_00.png',
    ],
    motions: {
      tap_bust: [
        { file: 'static/murakumo/motions/murakumo_tap_bust_01.mtn' },
        { file: 'static/murakumo/motions/murakumo_tap_bust_02.mtn' },
      ],
      idle: [
        { file: 'static/murakumo/motions/murakumo_idle_01.mtn' },
        { file: 'static/murakumo/motions/murakumo_idle_02.mtn' },
        { file: 'static/murakumo/motions/murakumo_idle_03.mtn' },
      ],
      tap_ear: [
        { file: 'static/murakumo/motions/murakumo_tap_ear_01.mtn' },
      ],
      tap: [
        { file: 'static/murakumo/motions/murakumo_m_01.mtn' },
        { file: 'static/murakumo/motions/murakumo_m_02.mtn' },
      ],
    },
    physics: 'static/murakumo/murakumo.physics.json',
  },
};

export const modelShizuku = {
  config: {
    scaleX: -0.2,
    scaleY: 0,
    scaleZ: 0.63,

    translateX: 0,
    translateY: -0.3,
  },
  model: {
    type: 'Live2D Model Setting',
    name: 'shizuku',
    model: 'static/shizuku/shizuku.moc',
    textures:
    [
      'static/shizuku/shizuku.1024/texture_00.png',
      'static/shizuku/shizuku.1024/texture_01.png',
      'static/shizuku/shizuku.1024/texture_02.png',
      'static/shizuku/shizuku.1024/texture_03.png',
      'static/shizuku/shizuku.1024/texture_04.png',
      'static/shizuku/shizuku.1024/texture_05.png',
    ],
    physics: 'static/shizuku/shizuku.physics.json',
    pose: 'static/shizuku/shizuku.pose.json',
    expressions:
    [
      { name: 'f01', file: 'static/shizuku/expressions/f01.exp.json' },
      { name: 'f02', file: 'static/shizuku/expressions/f02.exp.json' },
      { name: 'f03', file: 'static/shizuku/expressions/f03.exp.json' },
      { name: 'f04', file: 'static/shizuku/expressions/f04.exp.json' },
    ],
    layout:
    {
      center_x: 0,
      y: 1.2,
      width: 2.4,
    },
    hit_areas:
    [
      { name: 'head', id: 'D_REF.HEAD' },
      { name: 'body', id: 'D_REF.BODY' },
    ],
    motions:
    {
      idle:
      [
        { file: 'static/shizuku/motions/idle_00.mtn', fade_in: 2000, fade_out: 2000 },
        { file: 'static/shizuku/motions/idle_01.mtn', fade_in: 2000, fade_out: 2000 },
        { file: 'static/shizuku/motions/idle_02.mtn', fade_in: 2000, fade_out: 2000 },
      ],
      tap_body:
      [
        { file: 'static/shizuku/motions/tapBody_00.mtn', sound: 'static/shizuku/sounds/tapBody_00.mp3' },
        { file: 'static/shizuku/motions/tapBody_01.mtn', sound: 'static/shizuku/sounds/tapBody_01.mp3' },
        { file: 'static/shizuku/motions/tapBody_02.mtn', sound: 'static/shizuku/sounds/tapBody_02.mp3' },
      ],
      pinch_in:
      [
        { file: 'static/shizuku/motions/pinchIn_00.mtn', sound: 'static/shizuku/sounds/pinchIn_00.mp3' },
        { file: 'static/shizuku/motions/pinchIn_01.mtn', sound: 'static/shizuku/sounds/pinchIn_01.mp3' },
        { file: 'static/shizuku/motions/pinchIn_02.mtn', sound: 'static/shizuku/sounds/pinchIn_02.mp3' },
      ],
      pinch_out:
      [
        { file: 'static/shizuku/motions/pinchOut_00.mtn', sound: 'sounds/pinchOut_00.mp3' },
        { file: 'static/shizuku/motions/pinchOut_01.mtn', sound: 'sounds/pinchOut_01.mp3' },
        { file: 'static/shizuku/motions/pinchOut_02.mtn', sound: 'sounds/pinchOut_02.mp3' },
      ],
      shake:
      [
        { file: 'static/shizuku/motions/shake_00.mtn', sound: 'sounds/shake_00.mp3', fade_in: 500 },
        { file: 'static/shizuku/motions/shake_01.mtn', sound: 'sounds/shake_01.mp3', fade_in: 500 },
        { file: 'static/shizuku/motions/shake_02.mtn', sound: 'sounds/shake_02.mp3', fade_in: 500 },
      ],
      flick_head:
      [
        { file: 'static/shizuku/motions/flickHead_00.mtn', sound: 'sounds/flickHead_00.mp3' },
        { file: 'static/shizuku/motions/flickHead_01.mtn', sound: 'sounds/flickHead_01.mp3' },
        { file: 'static/shizuku/motions/flickHead_02.mtn', sound: 'sounds/flickHead_02.mp3' },
      ],
    },
  },
};

export const modelMiku = {
  config: {
    scaleX: -0.2,
    scaleY: 0,
    scaleZ: 0.75,

    translateX: 0,
    translateY: 0.3,
  },
  model: {
    version: 'Sample 1.0.0',
    model: 'static/miku/moc/miku.moc',
    textures: ['static/miku/moc/miku.2048/texture_00.png'],
    motions: {
      null: [
        { file: 'static/miku/mtn/miku_m_01.mtn' },
        { file: 'static/miku/mtn/miku_m_02.mtn' },
        { file: 'static/miku/mtn/miku_m_03.mtn' },
        { file: 'static/miku/mtn/miku_m_04.mtn' },
        { file: 'static/miku/mtn/miku_m_05.mtn' },
        { file: 'static/miku/mtn/miku_m_06.mtn' },
        { file: 'static/miku/mtn/miku_shake_01.mtn' },
      ],
      idle: [{ file: 'static/miku/mtn/miku_idle_01.mtn' }],
    },
    physics: 'static/miku/miku.physics.json',
  },
};

export const modelHaruto = {
  config: {
    scaleX: -0.2,
    scaleY: 0,
    scaleZ: 0.65,

    translateX: 0.2,
    translateY: 0.2,
  },
  model: {
    version: 'Sample 1.0.0',
    model: 'static/haruto/moc/haruto.moc',
    textures: ['static/haruto/moc/haruto.2048/texture_00.png'],
    motions: {
      idle: [
        { file: 'static/haruto/mtn/idle_02.mtn' }],
      tab: [{ file: 'static/haruto/mtn/01.mtn' },
        { file: 'static/haruto/mtn/02.mtn' },
        { file: 'static/haruto/mtn/03.mtn' },
        { file: 'static/haruto/mtn/04.mtn' },
        { file: 'static/haruto/mtn/05.mtn' },
        { file: 'static/haruto/mtn/06.mtn' },
        { file: 'static/haruto/mtn/07.mtn' },
        { file: 'static/haruto/mtn/08.mtn' },
        { file: 'static/haruto/mtn/09.mtn' },
      ],
    },
    physics: 'static/haruto/haruto.physics.json',
    name: 'haruto',
  },
};
