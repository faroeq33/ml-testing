type TrainingData = { v: number[]; lab: string }[];
export default class kNear {
  private k: number;
  private training: TrainingData;
  private array_size: number;

  /**
   * Creates a new instance of the kNN classifier
   * @param k - The number of nearest neighbors to use for classification
   * @param training - Optional array of training data points with features and labels
   * @throws {Error} If training data points have inconsistent feature vector lengths
   */
  constructor(k: number, training: TrainingData = []) {
    this.k = k;
    this.training = training;
    this.array_size = training.length === 0 ? -1 : training[0].v.length;
  }

  private dist(v1: number[], v2: number[]): number {
    let sum = 0;
    v1.forEach((val, index) => {
      sum += Math.pow(val - v2[index], 2);
    });
    return Math.sqrt(sum);
  }

  private updateMax(
    val: number,
    arr: Array<{ d: number; vote: string }>
  ): number {
    let max = 0;
    for (const obj of arr) {
      max = Math.max(max, obj.d);
    }
    return max;
  }

  private mode(store: string[]): string {
    const frequency: { [key: string]: number } = {};
    let max = 0;
    let result: string;
    for (const v of store) {
      frequency[v] = (frequency[v] || 0) + 1;
      if (frequency[v] > max) {
        max = frequency[v];
        result = v;
      }
    }
    return result!;
  }

  private checkInput(v: number[]): boolean {
    if (Array.isArray(v)) {
      if (v.length > 0) {
        if (typeof v[0] === "number") {
          if (this.array_size > -1) {
            if (v.length === this.array_size) {
              return true;
            } else {
              console.error(
                `Learn en classify verwachten een array met numbers van dezelfde lengte, je stuurt nu een array met lengte ${v.length}, terwijl je eerder lengte ${this.array_size} gebruikt hebt.`
              );
            }
          } else {
            this.array_size = v.length;
            return true;
          }
        } else {
          console.error(
            `Learn en classify verwachten een array met numbers, je stuurt nu array met ${typeof v[0]}.`
          );
        }
      } else {
        console.error(
          "Learn en classify verwachten een array met numbers, je stuurt nu lege array."
        );
      }
    } else {
      console.error(
        `Learn en classify verwachten een array met numbers, je stuurt nu geen array, maar ${typeof v}.`
      );
    }
    return false;
  }

  public learn(vector: number[], label: string): void {
    this.checkInput(vector);
    this.training.push({ v: vector, lab: label });
  }

  public classify(v: number[]): string {
    this.checkInput(v);
    const voteBloc: Array<{ d: number; vote: string }> = [];
    let maxD = 0;

    for (const obj of this.training) {
      const o = { d: this.dist(v, obj.v), vote: obj.lab };
      if (voteBloc.length < this.k) {
        voteBloc.push(o);
        maxD = this.updateMax(maxD, voteBloc);
      } else {
        if (o.d < maxD) {
          let bool = true;
          let count = 0;
          while (bool) {
            if (Number(voteBloc[count].d) === maxD) {
              voteBloc.splice(count, 1, o);
              maxD = this.updateMax(maxD, voteBloc);
              bool = false;
            } else {
              if (count < voteBloc.length - 1) {
                count++;
              } else {
                bool = false;
              }
            }
          }
        }
      }
    }
    const votes = voteBloc.map((el) => el.vote);
    return this.mode(votes);
  }
}
