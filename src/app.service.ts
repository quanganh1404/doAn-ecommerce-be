import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import * as tf from '@tensorflow/tfjs';

@Injectable()
export class AppService {
  getHello() {
    const randomName = faker.name.findName(); // Rowan Nikolaus
    const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
    const randomCard = faker.helpers.createCard(); // An object representing a random contact card containing many properties
    return {
      randomName: randomName,
      randomEmail: randomEmail,
      randomCard: randomCard,
    };
  }

  firstAi() {
    class AI {
      // Compile model
      compile() {
        // Is any model where the output of one layer are the input of next layer
        const model = tf.sequential();

        // Create input layer
        model.add(tf.layers.dense({ units: 3, inputShape: [3] }));

        // Create output layer
        model.add(tf.layers.dense({ units: 2 }));

        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

        return model;
      }

      // Run model / predict
      async run() {
        const model = this.compile();

        // Create a new const
        // xs - Input layer

        // 3 number in aray mean 3 unit
        // 3 arays mean inputshape is 3
        const xs = tf.tensor2d([
          [0.1, 0.2, 0.3],
          [0.2, 1.0, 0.1],
          [0.1, 1.0, 1.0],
        ]);

        // ys - Output layer
        const ys = tf.tensor2d([
          [1, 0],
          [0, 1],
          [1, 1],
        ]);

        await model
          .fit(xs, ys, {
            // Train model 1000 times
            epochs: 1000,
            // epochs: 1000,
          })
          .then(() => {
            const data = tf.tensor2d([[0.1, 0.2, 0.3]]);

            const prediction: any = model.predict(data);
            // prediction.print();
            prediction.print();
          });
      }
    }

    const ai = new AI();
    return ai.run();
  }

  //https://www.youtube.com/watch?v=wGGIi6K8a38
  secondAi() {
    return;
  }

  thirtAi() {
    return;
  }
}
