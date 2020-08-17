# AWS CDKによるDocker Image Assets Deployのテストプロジェクト

[AWS CDK](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)では，
各種AWSリソースと合わせて，コンテナイメージをデプロイすることができる．
ここでは，コンテナイメージがどのリポジトリにpushされるかを調べるため，動作テストを行った．

CDKは，2020/08/17時点での最新バージョンであるver1.59.0を使用した．
DockerImageAssets関連の実装は，`experimental and under active development`とのことで，
今後のアップデートで破壊的変更が行われる可能性があるので，最新情報を確認して使用する必要がある．

## リポジトリ名を指定しない場合

[aws-ecr-assets](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ecr-assets.DockerImageAsset.html)を用いた最もシンプルな実装では，下記のような実装となる．

```ts
import assets = require('@aws-cdk/aws-ecr-assets');

const imageAsset = new assets.DockerImageAsset(this, `docker-image`, {
    directory: path.join(__dirname, 'containers'), // Dockerfileがあるパスを指定する．
});
```

この場合，`aws-cdk/assets`というECRリポジトリが自動的に作成され，そこにビルドされたイメージがpushされた．
イメージのタグは，

## リポジトリ名を指定する場合

特定のECRリポジトリにpushしたい場合も多いと思う．その場合は，[StackSynthesizer](https://docs.aws.amazon.com/cdk/api/latest/typescript/api/core/defaultstacksynthesizer.html#core_DefaultStackSynthesizer_addDockerImageAsset)
の`addDockerImageAsset`を用いると実現できた．

```ts
export class AssetsStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props: AssetsStackProps) {
        super(scope, id, props);
        //======================================================================
        // Docker image assets - repository specification
        //======================================================================
        this.synthesizer.addDockerImageAsset({
            directoryName: path.join(__dirname, 'containers'), // Dockerfileがあるディレクトリを指定
            sourceHash: "イメージタグ名を指定",
            repositoryName: "リポジトリ名を指定"
        });
        //======================================================================
        // Docker image assets - repository specification end
        //======================================================================

        //======================================================================
        // NG PATTERN Docker image assets - repository specification
        //======================================================================
        // this.synthesizer.addDockerImageAsset({
        //     directoryName: path.join(__dirname, 'containers'),
        //     sourceHash: props.imageHash,
        //     // Failed to deploy. Cannot use string value from ssm parameter store.
        //     repositoryName: reposNameFromSSM
        // });
        // //======================================================================
        // NG PATTERN Docker image assets - repository specification end
        //======================================================================    
    }
}
```

注意点は，
- リポジトリ名はSSMパラメータストア等からデプロイ時に取得する実装は不可．
- sourceHashに指定するイメージタグ名を変更しない場合は，Dockerfileを変更しても新たなイメージがpushされない．
という点である．特に2つ目の点は注意が必要である．このプロジェクトでは，CI/CDパイプラインでgitコミットハッシュから
イメージタグ名を決定し，それをcdk context valueとして与えるようにして，毎回新しいイメージが生成されるようにした．

以上．
