import UIKit
import WebKit
import SwiftUI

struct ContentView: View {
    var body: some View {
        WebViewControllerWrapper()
            .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
#Preview {
    ContentView()
}

class ViewController: UIViewController, WKUIDelegate {

    var webView: WKWebView!

    override func loadView() {
        let configuration = WKWebViewConfiguration()
        configuration.allowsInlineMediaPlayback = true
        webView = WKWebView(frame: .zero, configuration: configuration)
        view = webView
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        let myURL = URL(string: "https://sdk-v1-sample.klleon.io/")
        let myRequest = URLRequest(url: myURL!)
        webView.load(myRequest)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        disableLongPressGesture(for: webView)
    }

    private func disableLongPressGesture(for view: UIView) {
        for recognizer in view.gestureRecognizers ?? [] {
            if let longPress = recognizer as? UILongPressGestureRecognizer {
                longPress.isEnabled = false
            }
        }

        for subview in view.subviews {
            disableLongPressGesture(for: subview)
        }
    }
}

struct WebViewControllerWrapper: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> ViewController {
        return ViewController()
    }

    func updateUIViewController(_ uiViewController: ViewController, context: Context) {
    }
}
